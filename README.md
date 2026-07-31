# EasyPoint PDV

Aplicação desktop responsável pela operação do caixa do EasyPoint.

O PDV é desenvolvido com **Tauri + React + TypeScript** e utiliza **SQLite como banco de dados local**, permitindo que o caixa continue operando mesmo quando estiver sem conexão com a internet.

## Responsabilidade

O EasyPoint PDV é responsável por toda a operação realizada diretamente no caixa:

* Leitura de códigos de barras
* Consulta local de produtos
* Controle do carrinho
* Aplicação de preços e descontos
* Finalização de vendas
* Registro de pagamentos
* Operação offline
* Impressão e integração com periféricos
* Sincronização das informações com a API

O PDV **não possui o banco central da aplicação**. O SQLite é utilizado apenas para manter os dados necessários à operação local.

## Offline-first

A operação do caixa deve continuar funcionando mesmo sem internet.

```text
Leitor
   ↓
EasyPoint PDV
   ↓
SQLite
   ↓
Carrinho
   ↓
Venda
   ↓
Fila de sincronização
   ↓
EasyPoint API
```

Quando a conexão estiver indisponível, as operações ficam armazenadas localmente como pendentes e são enviadas ao servidor assim que a conexão for restabelecida.

## Sincronização

O PDV recebe atualizações da API e mantém seus dados locais sincronizados com o servidor.

O **SignalR** pode ser utilizado para notificar o PDV de que existem alterações, enquanto a API continua sendo responsável por fornecer os dados.

O SQLite não é a fonte oficial dos dados. Ele representa o estado local necessário para que o caixa possa operar.

## Stack

* **Tauri** — aplicação desktop
* **React** — interface do PDV
* **TypeScript** — desenvolvimento da aplicação
* **SQLite** — persistência local
* **SignalR** — notificações de sincronização
* **REST API** — comunicação com o backend

## Princípio

* **O caixa não pode parar porque a internet caiu.**
