module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL || "postgres://docker:docker@localhost:5432/amatronic",
  "migrations": [
    `${process.env.CONFIG_ROOT}/shared/infra/typeorm/migrations/*.ts`
  ],
  "entities": [
    `${process.env.CONFIG_ROOT}/modules/**/infra/typeorm/entities/*.ts`
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  },
  "ssl": process.env.DATABASE_URL ? true : false
}
