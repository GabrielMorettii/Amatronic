<h1 align="center">Amatronic</h1>

<div align="center" style="display: inline_block"><br>
      <img align="center" alt="Gabriel-Node" height="40" width="40" src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg">
</div>

## Sumário

1. [Informações gerais do projeto](#informacoes-gerais)

2. [Diagrama de Classes](#diagrama-de-classe)

3. [Requisitos da aplicação](#requisitos-aplicacao)

  - [Consumidor](#consumidor)

    - [Cadastro de Consumidor](#cadastro-consumidor)

    - [Autenticação de Consumidor](#autenticacao-consumidor)

    - [Listagem de Consumidores](#listagem-consumidor)

    - [Atualização de Consumidor](#atualizacao-de-consumidor)

    - [Remoção de Consumidor](#remover-consumidor)

  - [Marca](#marca)

    - [Cadastro de uma Marca](#cadastro-marca)

    - [Listagem de Marcas](#listagem-marca)

    - [Atualização de uma Marca](#atualizacao-marca)

    - [Remoção de uma Marca](#remover-marca)

  - [Categoria](#categoria)

    - [Cadastro de uma Categoria](#cadastro-categoria)

    - [Listagem das Categorias](#listagem-categoria)

    - [Atualização de uma Categoria](#atualizacao-categoria)

    - [Remoção de uma Categoria](#remover-categoria)

  - [Produto](#produto)

    - [Cadastro de um Produto](#cadastro-produto)

    - [Listagem dos Produtos](#listagem-produto)

    - [Atualização de um Produto](#atualizacao-produto)

    - [Remoção de um Produto](#remover-produto)

    - [Imagem de um Produto]("imagem-produto)

  - [Ordem](#ordem)

    - [Cadastro de uma Ordem](#cadastro-ordem)

    - [Listagem de Ordens](#listagem-ordem)

    - [Atualização de uma Ordem](#atualizacao-ordem)

    - [Remoção de uma Ordem](#remover-ordem)

  - [Vendas](#venda)

    - [Cadastro de uma Venda](#cadastro-venda)

    - [Listagem de Vendas](#listagem-venda)

    - [Atualização de uma Venda](#atualizacao-venda)

    - [Remoção de uma Venda](#remover-venda)


## Informações gerais do projeto <a name="informacoes-gerais" />

Um e-commerce de dispositivos eletrônicos

## Diagrama de Classes <a name="diagrama-de-classe" />
<img src="./diagram.png">

## Requisitos da aplicação <a name="requisitos-aplicacao" />

### Consumidor <a name="consumidor" />

#### Cadastro de Consumidor <a name="cadastro-consumidor" />

##### Requisitos funcionais

- [x] Deve ser possível cadastrar um novo consumidor

##### Regras de negócio

- [x] Não deve ser possível cadastrar um consumidor com o email já existente
- [x] A senha do consumidor deve ser criptografada

#### Autenticação de Consumidor <a name="autenticacao-consumidor" />

##### Requisitos funcionais

- [x] Deve ser possível autenticar um consumidor

##### Requisitos não funcionais

- [x] Deve ser utilizado o bcrypt para criptografar a senha
- [x] Deve ser utilizado o jsonwebtoken como forma de autenticar

##### Regras de negócio

- [x] Não deve ser possível autenticar com o email incorreto
- [x] Não deve ser possível autenticar com a senha incorreta


#### Listagem de Consumidores <a name="listagem-consumidor" />

##### Requisitos funcionais

- [x] Deve ser possível listar todos os consumidors

##### Regras de negócio

- [x] O consumidor responsável pela listagem deve ser um consumidor administrador.

#### Atualização de Consumidor <a name="atualizacao-de-consumidor" />

##### Requisitos funcionais

- [x] Deve ser possível atualizar os dados de um consumidor

##### Regras de negócio

- [x] O consumidor responsável pela atualização deve estar logado na aplicação
- [x] Não deve ser possível atualizar um consumidor inexistente
- [x] Não deve ser possível a atualização de email do consumidor caso o mesmo já esteja exista

#### Remoção de Consumidor <a name="remover-consumidor" />

##### Requisitos funcionais

- [x] Deve ser possível remover um consumidor

##### Regras de negócio

- [x] O consumidor deve conseguir remover a própria conta
- [x] O consumidor deve estar logado na aplicação

### Marca <a name="marca" />

#### Cadastro de Marca <a name="cadastro-marca" />

##### Requisitos funcionais

- [x] Deve ser possível cadastrar uma nova marca

##### Regras de negócio

- [x] Não deve ser possível cadastrar uma nova marca com o nome já existente
- [x] Somente o administrador deve ser responsável por cadastrar uma marca

#### Listagem de Marcas <a name="listagem-marca" />

##### Requisitos funcionais

- [x] Deve ser possível listar todas as marcas

#### Atualização de Marca <a name="atualizacao-marca" />

##### Requisitos funcionais

- [x] Deve ser possível atualizar os dados de uma marca

##### Regras de negócio

- [x] Somente o administrador deve ser responsável pela atualização de uma marca
- [x] Não deve ser possível atualizar uma marca inexistente
- [x] Não deve ser possível atualizar uma marca com o nome já existente

#### Remoção de Marca <a name="remover-marca" />

##### Requisitos funcionais

- [x] Deve ser possível remover uma marca

##### Regras de negócio

- [x] Somente o administrador deve ser responsável pela remoção de uma marca
- [x] Não deve ser possível remover uma marca inexistente

### Categoria <a name="categoria" />

#### Cadastro de Categoria <a name="cadastro-categoria" />

##### Requisitos funcionais

- [x] Deve ser possível cadastrar uma nova categoria

##### Regras de negócio

- [x] Não deve ser possível cadastrar uma nova categoria com o nome já existente
- [x] Somente o administrador deve ser responsável por cadastrar uma categoria

#### Listagem de Categorias <a name="listagem-categoria" />

##### Requisitos funcionais

- [x] Deve ser possível listar todas as categorias

#### Atualização de Categoria <a name="atualizacao-categoria" />

##### Requisitos funcionais

- [x] Deve ser possível atualizar os dados de uma categoria

##### Regras de negócio

- [x] Somente o administrador deve ser responsável pela atualização de uma categoria
- [x] Não deve ser possível atualizar uma categoria inexistente
- [x] Não deve ser possível atualizar uma categoria com o nome já existente

#### Remoção de Categoria <a name="remover-categoria" />

##### Requisitos funcionais

- [x] Deve ser possível remover uma categoria

##### Regras de negócio

- [x] Somente o administrador deve ser responsável pela remoção de uma categoria
- [x] Não deve ser possível remover uma categoria inexistente




### Produto <a name="produto" />

#### Cadastro de Produto <a name="cadastro-produto" />

##### Requisitos funcionais

- [x] Deve ser possível cadastrar um novo produto

##### Regras de negócio

- [x] Não deve ser possível cadastrar um novo produto com o nome já existente
- [x] Não deve ser possível cadastrar um novo produto com a categoria inexistente
- [x] Não deve ser possível cadastrar um novo produto com a marca inexistente
- [x] Somente o administrador deve ser responsável por cadastrar um produto

#### Listagem de Produtos <a name="listagem-produto" />

##### Requisitos funcionais

- [x] Deve ser possível listar todos os produtos

#### Atualização de Produto <a name="atualizacao-produto" />

##### Requisitos funcionais

- [x] Deve ser possível atualizar os dados de um produto

##### Regras de negócio

- [x] Não deve ser possível atualizar um produto inexistente
- [x] Não deve ser possível atualizar um produto com a categoria inexistente
- [x] Não deve ser possível atualizar um produto com a marca inexistente
- [x] Somente o administrador deve ser responsável por atualizar um produto

#### Remoção de Produto <a name="remover-produto" />

##### Requisitos funcionais

- [x] Deve ser possível remover um produto

##### Regras de negócio

- [x] Somente o administrador deve ser responsável pela remoção de um produto
- [x] Não deve ser possível remover um produto inexistente

#### Imagem de um Produto <a name="imagem-produto" />

##### Requisitos funcionais

- [x] Deve ser possível adicionar imagem a um produto

##### Requisitos não funcionais

- [x] O upload de imagens locais deve ser feito usando o multer

##### Regras de negócio

- [x] Não deve ser possível adicionar imagens a um produto inexistente
- [x] Deve ser possível remover todas as imagens já existentes para o produto
- [x] Deve ser possível adicionar as imagens localmente
- [x] Somente o administrador deve ser responsável por adicionar imagens


### Ordem <a name="ordem" />

#### Cadastro de Ordem <a name="cadastro-ordem" />

##### Requisitos funcionais

- [x] Deve ser possível cadastrar um nova ordem

##### Regras de negócio

- [x] O resposável pelo cadastro deve estar logado na aplicação
- [x] Não deve ser possível cadastrar uma ordem para um consumidor inválido
- [x] Não deve ser possível cadastrar uma ordem para com vendas inexistentes

#### Listagem de Ordens <a name="listagem-ordem" />

##### Requisitos funcionais

- [x] Deve ser possível listar todas as ordens

##### Regras de negócio

- [x] O resposável pela listagem deve ser um administrador

#### Atualização de Ordem <a name="atualizacao-ordem" />

##### Requisitos funcionais

- [x] Deve ser possível atualizar os dados de uma ordem

##### Regras de negócio

- [x] Não deve ser possível atualizar uma ordem inexistente
- [x] Não deve ser possível atualizar uma ordem com vendas inexistentes
- [x] Somente o administrador deve ser responsável por atualizar uma ordem

#### Remoção de Ordem <a name="remover-ordem" />

##### Requisitos funcionais

- [x] Deve ser possível remover uma ordem

##### Regras de negócio

- [x] Somente o administrador deve ser responsável pela remoção de uma ordem
- [x] Não deve ser possível remover uma ordem inexistente



### Vendas <a name="venda" />

#### Cadastro de Venda <a name="cadastro-venda" />

##### Requisitos funcionais

- [x] Deve ser possível cadastrar um nova venda

##### Regras de negócio

- [x] O resposável pelo cadastro deve estar logado na aplicação
- [x] Não deve ser possível cadastrar uma venda para um produto inválido
- [x] Não deve ser possível cadastrar uma venda para um produto sem estoque
- [x] Deve ser possível decrementar o estoque de um produto com a quantidade
comprada pelo consumidor
- [x] Deve ser possivel atualizar a data de atualização de um produto

#### Listagem de Vendas <a name="listagem-venda" />

##### Requisitos funcionais

- [x] Deve ser possível listar todas as vendas

##### Regras de negócio

- [x] O resposável pela listagem deve ser um administrador

#### Atualização de Venda <a name="atualizacao-venda" />

##### Requisitos funcionais

- [x] Deve ser possível atualizar os dados de uma venda

##### Regras de negócio

- [x] Não deve ser possível atualizar uma venda inexistente
- [x] Deve ser possível atualizar a data de atualização de uma venda
- [x] Somente o administrador deve ser responsável por atualizar uma venda

#### Remoção de Venda <a name="remover-venda" />

##### Requisitos funcionais

- [x] Deve ser possível remover uma venda

##### Regras de negócio

- [x] Não deve ser possível remover uma venda inexistente
- [x] Somente o administrador deve ser responsável pela remoção de uma venda

## 💻 Enviroment Setup

```
# Clone this repository
$ git clone https://github.com/padupe/conceitos_typescript

# Add the dependencies
$ yarn install

# Up the existents containers
$ docker-compose up

# Run the application
$ yarn dev

# Run the tests
$ yarn test
```

## Docs

<h3>http://localhost:3333/docs/<h3>

## 🔧 Tools

- [BCrypt](https://www.npmjs.com/package/bcrypt 'BCrypt')
- [Cors](https://www.npmjs.com/package/cors 'Cors')
- [Docker](https://www.docker.com/ 'Docker')
- [ESLint](https://eslint.org/ 'ESLint')
- [Express](https://expressjs.com/pt-br/ 'Express')
- [ExpressJS Async Errors](https://www.npmjs.com/package/express-async-errors 'ExpressJS Async Errors')
- [Jest](https://jestjs.io/pt-BR/docs/cli 'Jest')
- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken 'JSONWebToken')
- [Multer](https://www.npmjs.com/package/multer 'Multer')
- [PostgreSQL](https://www.postgresql.org/ 'PostgreSQL')
- [Prettier](https://prettier.io/ 'Prettier')
- [Swagger](https://swagger.io/ 'Swagger')
- [SuperTest](https://www.npmjs.com/package/supertest 'SuperTest')
- [TSConfig-Paths](https://www.npmjs.com/package/tsconfig-paths, 'TSConfig-Paths')
- [TSyringe](https://github.com/microsoft/tsyringe 'TSyringe')
- [TypeORM](https://typeorm.io/#/ 'TypeORM')
- [TypeScript](https://www.typescriptlang.org/ 'TypeScript')
---


## 🧐 Contributing

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Thank you!

## 👮 License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/GabrielMorettii/Amatronic/blob/main/LICENSE) file for details.

<div align="center">
    <h2>Contact me</h2>
  <a href="https://www.linkedin.com/in/gabriel-morettii/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
  <a href="mailto:gabrielmorettisilva@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
</div>
