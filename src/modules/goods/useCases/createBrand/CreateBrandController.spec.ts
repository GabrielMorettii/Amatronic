import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';
import request from 'supertest'
import {app} from '@shared/infra/http/app'

let connection: Connection;

describe('Create Brand Controller', ()=>{
  beforeAll(async ()=>{
    connection = await createConnection();
    await connection.runMigrations();
  })

  afterAll(async ()=>{
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to create a new brand', async ()=>{
    const response = await request(app).post('/brands').send({
      name: "Samsung",
    })

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201)
  })

  it('Should not be able to create a new brand with a already existent name', async ()=>{
    const response = await request(app).post('/brands').send({
      name: "Samsung",
    })

    expect(response.status).toBe(400)
  })
})
