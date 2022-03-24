# Amatronic

## Sumário

1. [Informações gerais do projeto](#informacoes-gerais)

2. [Diagrama de Classes](#diagrama-de-classe)

3. [Requisitos da aplicação](#requisitos-aplicacao)

   3.1. [Cadastro de usuários](#cadastro-usuarios)

   3.2. [Listagem de usuários](#listagem-usuarios)

   3.3. [Atualização de usuário](#atualizacao-de-usuario)

   3.4. [Remoção de usuário](#remover-usuario)


## Informações gerais do projeto <a name="informacoes-gerais" />

Um e-commerce de dispositivos eletrônicos

## Diagrama de Classes <a name="diagrama-de-classe" />
<img src="./diagram.png">

## Requisitos da aplicação <a name="requisitos-aplicacao" />

### Cadastro de usuários <a name="cadastro-usuarios" />

#### Requisitos funcionais

- Deve ser possível cadastrar um novo usuário

#### Regras de negócio

- Não deve ser possível cadastrar um usuário com o email já existente
- Não deve ser possível cadastrar um usuário administrador

### Listagem de usuários <a name="listagem-usuarios" />

#### Requisitos funcionais

- Deve ser possível listar todos os usuários

#### Regras de negócio

- O usuário responsável pela listagem deve ser um usuário administrador.

### Atualização de usuário <a name="atualizacao-de-usuario" />

#### Requisitos funcionais

- Deve ser possível atualizar os dados de um usuário

#### Regras de negócio

- O usuário responsável pela atualização deve estar logado na aplicação
- Não deve ser possível a atualização de email do usuário caso o mesmo já esteja exista

### Remoção de usuário <a name="remover-usuario" />

#### Requisitos funcionais

- Deve ser possível remover um usuário

#### Regras de negócio

- O usuário responsável deve ser um usuário administrador.
