# EasyPoint PDV

Aplicação desktop do **EasyPoint — Ponto Fácil**, desenvolvida para operação dos caixas de estabelecimentos comerciais.

## 🎯 Propósito

O `easypoint-pdv` é o aplicativo utilizado diretamente pelo operador do caixa.

Sua responsabilidade é fornecer uma interface rápida e simples para realizar operações de venda e comunicação com os periféricos do caixa.

## 🛒 Principais responsabilidades

* Leitura de códigos de barras
* Consulta de produtos
* Exibição de preços
* Gerenciamento do carrinho da venda
* Controle de quantidades
* Finalização de vendas
* Recebimento de pagamentos
* Comunicação com impressoras
* Comunicação com outros periféricos do caixa
* Exibição de informações e mensagens para o operador

## 🏗️ Arquitetura

```text
              EasyPoint PDV
                   │
          ┌────────┴────────┐
          │                 │
       Scanner           Impressora
          │                 │
          └────────┬────────┘
                   │
                   ▼
              WPF / C#
                   │
                HTTP/HTTPS
                   │
                   ▼
             EasyPoint API
```

O PDV funciona como um **cliente da API**. Ele não acessa diretamente o banco de dados.

## 🛠️ Tecnologias

* C#
* .NET
* WPF
* XAML
* MVVM

## 📌 Responsabilidade

O PDV é responsável principalmente pela **experiência e operação do caixa**.

As regras de negócio e informações centralizadas ficam sob responsabilidade do `easypoint-api`.

```text
PDV
 ↓
Interface e periféricos
 ↓
EasyPoint API
 ↓
Regras de negócio
 ↓
Banco de dados
```

## 🚧 Status

Em desenvolvimento.

## 🔗 Projetos relacionados

* `easypoint-api` — backend central da plataforma
* `easypoint-admin` — painel web para gerenciamento
