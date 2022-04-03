<h1 align="center">Amatronic</h1>

<div align="center" style="display: inline_block"><br>
      <img align="center" alt="Gabriel-Node" height="40" width="40" src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg">
</div>

## Sumário

1. [Informações gerais do projeto](#informacoes-gerais)

2. [Diagrama de Classes](#diagrama-de-classe)

3. [Requisitos da aplicação](#requisitos-aplicacao)

4. [Setup da aplicação](#setup-aplicacao)

5. [Documentação](#docs)

6. [Ferramentas](#ferramentas)

6. [Provedores](#ferramentas-suporte)

7. [Contribuindo](#contribuindo)

8. [Licença](#licenca)

## Informações gerais do projeto <a name="informacoes-gerais" />

Um e-commerce de dispositivos eletrônicos

## Diagrama de Classes <a name="diagrama-de-classe" />
<img src="./diagram.png">

## 📌 Project requeriments <a name="requisitos-aplicacao" />:

All business rules for this API can be found on this [link](./docs/business_rules.md).

## 💻 Enviroment Setup <a name="setup-aplicacao" />:

```
# Clone this repository
$ git clone https://github.com/GabrielMorettii/Amatronic.git

# Add the dependencies
$ yarn install

# Up the existents containers
$ docker-compose up

# Run the migrations
$ yarn typeorm migration:run

# Run the application
$ yarn dev

# Run the tests
$ yarn test
```

## 📚 Docs <a name="docs" />:

<a href="http//localhost:3333/docs">http//localhost:3333/docs</a>

## 🔧 Built With <a name="ferramentas" />:

- [BCrypt](https://www.npmjs.com/package/bcrypt 'BCrypt') - For password-hashing
- [Cors](https://www.npmjs.com/package/cors 'Cors') - Enable the cross-origin acess
- [Docker](https://www.docker.com/ 'Docker') - Enables the containerization
- [ExpressJS Async Errors](https://www.npmjs.com/package/express-async-errors 'ExpressJS Async Errors') - Error handling support for express
- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken 'JSONWebToken') - For authentication
- [Swagger](https://swagger.io/ 'Swagger') - Helps on the RESTful API Design and documentation
- [TSConfig-Paths](https://www.npmjs.com/package/tsconfig-paths, 'TSConfig-Paths') -
Modules Mapping
- [TSyringe](https://github.com/microsoft/tsyringe 'TSyringe') - Dependency Injection
- [TypeORM](https://typeorm.io/#/ 'TypeORM') - ORM
- [TypeScript](https://www.typescriptlang.org/ 'TypeScript') - Javascript's superset
- [eslint](https://eslint.org/) - JS Linter and code style
- [JEST](https://jestjs.io/) - Tests
- [prettier](https://github.com/prettier/prettier) - Code formatter
- [super-test](https://github.com/visionmedia/supertest) - Test HTTP requests
- [NodeJS](https://nodejs.org/en/) - Build the server
- [AWS](https://aws.amazon.com/pt/) - IaaS used in the production
- [GitHub](https://github.com/GabrielMorettii/ignite_rentx/actions) - CI + CD
- [express](https://expressjs.com/) - Router of the Application
- [postgreSQL](https://www.postgresql.org/) - Relational Database
- [pm2](https://pm2.keymetrics.io/) - Process Manager used in the production
- [dotenv](https://github.com/motdotla/dotenv) - Environment loader
- [multer](https://github.com/expressjs/multer) - File Upload

---

## 🧰 Support tools <a name="ferramentas-suporte" />:

- [Amazon SES](https://aws.amazon.com/pt/ses/) - Email Provider
- [Amazon S3](https://aws.amazon.com/pt/s3/) - Storage Service

## 🧐 Contributing <a name="contribuindo" />:

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Email-me: gabrielmorettisilva@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/gabriel-morettii/)

Thank you!

## 🔑 License <a name="licenca" />:

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/GabrielMorettii/Amatronic/blob/main/LICENSE) file for details.
