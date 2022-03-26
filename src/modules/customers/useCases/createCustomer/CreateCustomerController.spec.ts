import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';
import request from 'supertest'
import {app} from '@shared/infra/http/app'

let connection: Connection;

describe('Create Customer Controler', ()=>{
  beforeAll(async ()=>{
    connection = await createConnection();
    await connection.runMigrations();
  })

  afterAll(async ()=>{
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to create a new customer', async ()=>{
    const response = await request(app).post('/customers').send({
      name: "GabrielMDS",
      email: "gabrielmorettisilva@gmail.com",
      password: "123123"
    })

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201)
  })

  it('Should not be able to create a new customer with a already existent email', async ()=>{
    const response = await request(app).post('/customers').send({
      name: "Gabriel",
      email: "gabrielmorettisilva@gmail.com",
      password: "123"
    })

    expect(response.status).toBe(400)
  })
})
