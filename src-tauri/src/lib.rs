use reqwest::StatusCode;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::time::Duration;

#[derive(Serialize)]
struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct LoginResponse {
    access_token: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CashRegisterItem {
    id: String,
    name: String,
    code: String,
    is_active: bool,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CashRegisterPage {
    items: Vec<CashRegisterItem>,
    page: i32,
    per_page: i32,
    total_items: i32,
    #[serde(default)]
    total_pages: i32,
}

fn api_error_message(status: StatusCode, body: &str) -> String {
    if let Ok(payload) = serde_json::from_str::<Value>(body) {
        if let Some(error) = payload.get("error").and_then(Value::as_str) {
            if !error.trim().is_empty() {
                return error.to_string();
            }
        }

        if let Some(title) = payload.get("title").and_then(Value::as_str) {
            if !title.trim().is_empty() {
                return title.to_string();
            }
        }

        if let Some(errors) = payload.get("errors").and_then(Value::as_object) {
            if let Some(message) = errors
                .values()
                .flat_map(Value::as_array)
                .flat_map(|messages| messages.iter())
                .find_map(Value::as_str)
            {
                return message.to_string();
            }
        }
    }

    match status {
        StatusCode::UNAUTHORIZED => "E-mail ou senha inválidos.".to_string(),
        StatusCode::BAD_REQUEST => "Confira os dados informados.".to_string(),
        _ => "Não foi possível concluir o login. Tente novamente.".to_string(),
    }
}

fn api_client() -> Result<reqwest::Client, String> {
    reqwest::Client::builder()
        .connect_timeout(Duration::from_secs(5))
        .timeout(Duration::from_secs(15))
        .build()
        .map_err(|_| "Não foi possível preparar a conexão com a API.".to_string())
}

#[tauri::command]
async fn login(url: String, email: String, password: String) -> Result<String, String> {
    let api_url = url.trim().trim_end_matches('/');

    if api_url.is_empty() {
        return Err("A URL da API não foi configurada.".to_string());
    }

    let client = api_client()?;

    let response = client
        .post(format!("{api_url}/auth/login"))
        .json(&LoginRequest { email, password })
        .send()
        .await
        .map_err(|_| "Não foi possível conectar à API. Verifique sua conexão.".to_string())?;

    let status = response.status();
    let body = response
        .text()
        .await
        .map_err(|_| "A API não retornou uma resposta válida.".to_string())?;

    if !status.is_success() {
        return Err(api_error_message(status, &body));
    }

    let payload = serde_json::from_str::<LoginResponse>(&body)
        .map_err(|_| "A API não retornou um token de acesso válido.".to_string())?;

    if payload.access_token.trim().is_empty() {
        return Err("A API não retornou um token de acesso válido.".to_string());
    }

    Ok(payload.access_token)
}

#[tauri::command]
async fn get_cash_registers(
    url: String,
    access_token: String,
    page: i32,
    per_page: i32,
) -> Result<CashRegisterPage, String> {
    let api_url = url.trim().trim_end_matches('/');

    if api_url.is_empty() {
        return Err("A URL da API não foi configurada.".to_string());
    }

    if access_token.trim().is_empty() {
        return Err("Sua sessão expirou. Entre novamente para continuar.".to_string());
    }

    let client = api_client()?;
    let response = client
        .get(format!("{api_url}/cash-registers"))
        .query(&[("page", page), ("perPage", per_page)])
        .bearer_auth(access_token)
        .header("Accept", "application/json")
        .send()
        .await
        .map_err(|_| "Não foi possível conectar à API. Verifique sua conexão.".to_string())?;

    let status = response.status();
    let body = response
        .text()
        .await
        .map_err(|_| "A API não retornou uma resposta válida.".to_string())?;

    if !status.is_success() {
        return Err(api_error_message(status, &body));
    }

    serde_json::from_str::<CashRegisterPage>(&body)
        .map_err(|_| "A API não retornou uma lista de caixas válida.".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![login, get_cash_registers])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
