# Amatronic

## Sumário

1. [Informações gerais do projeto](#informacoes-gerais)

2. [Diagrama de Classes](#diagrama-de-classe)

3. [Requisitos da aplicação](#requisitos-aplicacao)

   3.1. [Consumidor](#consumidor)

    3.1.1 [Cadastro de Consumidor](#cadastro-consumidor)

   3.2. [Listagem de Consumidores](#listagem-consumidor)

   3.3. [Atualização de Consumidor](#atualizacao-de-consumidor)

   3.4. [Remoção de Consumidor](#remover-consumidor)

   3.5. [Cadastro de uma Marca](#cadastro-marca)

   3.6. [Listagem de Marcas](#listagem-marca)

   3.7. [Atualização de uma Marca](#atualizacao-marca)

   3.8. [Remoção de uma Marca](#remover-marca)

   3.9. [Cadastro de uma Marca](#cadastro-marca)

   4.0. [Listagem de Marcas](#listagem-marca)

   4.1. [Atualização de uma Marca](#atualizacao-marca)

   4.2. [Remoção de uma Marca](#remover-marca)



## Informações gerais do projeto <a name="informacoes-gerais" />

Um e-commerce de dispositivos eletrônicos

## Diagrama de Classes <a name="diagrama-de-classe" />
<img src="./diagram.png">

## Requisitos da aplicação <a name="requisitos-aplicacao" />

### Cadastro de Consumidor <a name="cadastro-consumidor" />

#### Requisitos funcionais

- Deve ser possível cadastrar um novo consumidor

#### Regras de negócio

- Não deve ser possível cadastrar um consumidor com o email já existente
- A senha do consumidor deve ser criptografada

### Listagem de Consumidores <a name="listagem-consumidor" />

#### Requisitos funcionais

- Deve ser possível listar todos os consumidors

#### Regras de negócio

- O consumidor responsável pela listagem deve ser um consumidor administrador.

### Atualização de Consumidor <a name="atualizacao-de-consumidor" />

#### Requisitos funcionais

- Deve ser possível atualizar os dados de um consumidor

#### Regras de negócio

- O consumidor responsável pela atualização deve estar logado na aplicação
- Não deve ser possível atualizar um consumidor inexistente
- Não deve ser possível a atualização de email do consumidor caso o mesmo já esteja exista

### Remoção de Consumidor <a name="remover-consumidor" />

#### Requisitos funcionais

- Deve ser possível remover um consumidor

#### Regras de negócio

- O consumidor deve conseguir remover a própria conta
- O consumidor deve estar logado na aplicação

### Cadastro de Marca <a name="cadastro-marca" />

#### Requisitos funcionais

- Deve ser possível cadastrar uma nova marca

#### Regras de negócio

- Não deve ser possível cadastrar uma nova marca com o nome já existente
- Somente o administrador deve ser responsável por cadastrar uma marca

### Listagem de Marcas <a name="listagem-marca" />

#### Requisitos funcionais

- Deve ser possível listar todas as marcas

### Atualização de Marca <a name="atualizacao-marca" />

#### Requisitos funcionais

- Deve ser possível atualizar os dados de uma marca

#### Regras de negócio

- Somente o administrador deve ser responsável pela atualização de uma marca
- Não deve ser possível atualizar uma marca inexistente
- Não deve ser possível atualizar uma marca com o nome já existente

### Remoção de Marca <a name="remover-marca" />

#### Requisitos funcionais

- Deve ser possível remover uma marca

#### Regras de negócio

- Somente o administrador deve ser responsável pela remoção de uma marca
- Não deve ser possível remover uma marca inexistente

### Cadastro de Marca <a name="cadastro-marca" />

#### Requisitos funcionais

- Deve ser possível cadastrar uma nova marca

#### Regras de negócio

- Não deve ser possível cadastrar uma nova marca com o nome já existente
- Somente o administrador deve ser responsável por cadastrar uma marca

### Listagem de Marcas <a name="listagem-marca" />

#### Requisitos funcionais

- Deve ser possível listar todas as marcas

### Atualização de Marca <a name="atualizacao-marca" />

#### Requisitos funcionais

- Deve ser possível atualizar os dados de uma marca

#### Regras de negócio

- Somente o administrador deve ser responsável pela atualização de uma marca
- Não deve ser possível atualizar uma marca inexistente
- Não deve ser possível atualizar uma marca com o nome já existente

### Remoção de Marca <a name="remover-marca" />

#### Requisitos funcionais

- Deve ser possível remover uma marca

#### Regras de negócio

- Somente o administrador deve ser responsável pela remoção de uma marca
- Não deve ser possível remover uma marca inexistente


