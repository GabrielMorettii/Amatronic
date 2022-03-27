import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';
import request from 'supertest'
import {app} from '@shared/infra/http/app'
import {v4 as uuidv4} from 'uuid'
import {hash} from 'bcrypt'

let connection: Connection;

describe('Authenticate Customer Controler', ()=>{
  beforeAll(async ()=>{
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();

    const password = await hash('gabrieldev', 8)

    await connection.query(`INSERT INTO customers
    (id, name, email, password, avatar, admin, created_at, updated_at)
    VALUES('${id}', 'adminAmatronic', 'gabrieldev@gmail.com', '${password}',
    null, true, 'now()', 'now()')`)

  })

  afterAll(async ()=>{
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to authenticate a customer', async ()=>{
    const response = await request(app).post('/sessions').send({
      email: "gabrieldev@gmail.com",
      password: "gabrieldev"
    })

    expect(response.body).toHaveProperty('token')
  })

  it('Should not be able to authenticate a customer with invalid user credentials', async()=>{
    const response = await request(app).post('/sessions').send({
      email: "gabrieldevops@gmail.com",
      password: "gabrieldevops"
    })

    expect(response.status).toBe(400);
  })

  it('Should not be able to authenticate a customer with invalid password credentials', async()=>{
    const response = await request(app).post('/sessions').send({
      email: "gabrieldev@gmail.com",
      password: "gabrieldevops"
    })

    expect(response.status).toBe(400);
  })
})
