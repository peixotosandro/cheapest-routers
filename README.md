# API - Seleção de Candidatos
API para ajudar o recrutador a encontrar candidatos mais aderentes as vagas as quais eles se candidataram.
A cada candidatura, é calculado um score considerando distância entre moradia e trabalho, e também o nível de experiência requerido pela a vaga e o nível de experiência do candidato.

## Para preparar ambiente ##
Necessário ter o Node.js instalado.

Instalar as dependências da aplicação com *yarn* ou *npm*. No diretório raiz da aplicação digitar:

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

## Para executar a API ##
Execute o comando no diretório raiz da aplicação para executar a API:

```shell
$ yarn start
```
ou

```shell
$ npm start
```

Pode ser utilizado o *Docker*. Execute o comando no diretório raíz da aplicação:

```shell
$ docker build -t vagas .

$ docker run --name api-vagas -p 9000:9000 -d vagas
```
