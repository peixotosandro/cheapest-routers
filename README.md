# cheapest-routes
Aplicação para encontrar rotas de viagem mais baratas e também cadastrar novas conexões.
O desenvolvimento foi feito em JavaScript utilizando a plataforma Node.js.

## Para preparar ambiente ##
Necessário ter o **Node.js** instalado.

Instalar as dependências da aplicação com **yarn** (necessário instalação) ou **npm**. No diretório raiz da aplicação digitar:

```shell
$ yarn
```
ou

```shell
$ npm install
```

## Para executar os testes ##
Execute o comando no diretório raiz da aplicação para executar os testes:

```shell
$ yarn test
```
ou

```shell
$ npm test
```

## Para executar a API REST ##
Execute o comando no diretório raiz da aplicação:

```shell
$ yarn start <caminho do arquivo texto com as rotas>
```
ou

```shell
$ npm start <caminho do arquivo texto com as rotas>
```

## Para executar a Interface de Console ##
Execute o comando no diretório raiz da aplicação:

```shell
$ yarn start-interface
```
ou

```shell
$ npm start-interface
```

## Descrição da API REST ##
### Para consultar a rota mais barata ###
#### (GET) /v1/routes/cheapest/:partida-chegada ####
```
http://localhost:9000/v1/routes/cheapest/<partida-chegada>
```
Exemplo de requisição:
```
http://localhost:9000/v1/routes/cheapest/gru-cdg
```
Status 200
```javascript
{
    "route": [
        "GRU",
        "BRC",
        "SCL",
        "ORL",
        "CDG"
    ],
    "price": 40
}
```
Status 400
```javascript
{
   "error": "There is no suggested route for GRU-AAA"
}
```

### Para adicionar rota ao arquivo CSV ### 
#### (POST) /v1/routes ####
```
http://localhost:9000/v1/routes
```
Exemplo de requisição:
```
http://localhost:9000/v1/routes
```
Dados em formato JSON para requisição:
```javascript
{ 
  "start": "brc", 
  "end": "cdg", 
  "price": 5
}
```
Status 200
```javascript
{
    "error": "Route added successfully 'BRC,CDG,5'"
}
```
Status 400
```javascript
{
    "error": "Route already added 'BRC,CDG,5'"
}
```
Status 400
```javascript
{
    "error": "Validation error'"
}
```
