import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';
import request from 'supertest'
import {app} from '@shared/infra/http/app'
import {v4 as uuidv4} from 'uuid'
import {hash} from 'bcrypt'

let connection: Connection;

let tokenAuth = null;

describe('Update Customer Controller', ()=>{
  beforeAll(async ()=>{
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();

    const password = await hash('gabrieldev', 8)

    await connection.query(`INSERT INTO customers
    (id, name, email, password, avatar, admin, created_at, updated_at)
    VALUES('${id}', 'gabrielCustomer', 'gabrieldev@gmail.com', '${password}',
    null, false, 'now()', 'now()')`)

    const responseToken = await request(app).post('/sessions').send({
      email: "gabrieldev@gmail.com",
      password: "gabrieldev"
    })

    const {token} = responseToken.body;

    tokenAuth = token
  })

  afterAll(async ()=>{
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to update a customer data', async ()=>{
    const response = await request(app).put('/customers').send({
      name: "gabrieldevback",
      email: "gabrieldevback@gmail.com",
      avatar: "imagemdegabriel"
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.body.email).toEqual("gabrieldevback@gmail.com")
    expect(response.body.name).toEqual("gabrieldevback")
    expect(response.body.avatar).toEqual("imagemdegabriel")
  })


  it('Should not be able to update a customer email to a email already taken', async ()=>{
    const id = uuidv4();

    await connection.query(`INSERT INTO customers
    (id, name, email, password, avatar, admin, created_at, updated_at)
    VALUES('${id}', 'gabrielCustomer2', 'gabrieldev2@gmail.com', '1234',
    null, false, 'now()', 'now()')`)

    const response = await request(app).put('/customers').send({
      name: "gabrieldevback",
      email: "gabrieldev2@gmail.com",
      avatar: "imagemdegabriel"
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(400)
  })

  it('Should not be able to update a non-existent customer', async ()=>{
    const response = await request(app).put('/customers').send({
      name: "gabrieldevback",
      email: "gabrieldevback@gmail.com",
      avatar: "imagemdegabriel"
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(400)
  })
})
