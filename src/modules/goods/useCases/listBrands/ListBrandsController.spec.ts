import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';
import request from 'supertest'
import {app} from '@shared/infra/http/app'

let connection: Connection;

describe('List Brands Controller', ()=>{
  beforeAll(async ()=>{
    connection = await createConnection();
    await connection.runMigrations();
  })

  afterAll(async ()=>{
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to list all the brands', async ()=>{
    await request(app).post('/brands').send({
      name: "Samsung",
    })

    const response = await request(app).get('/brands');

    expect(response.body.length).toBe(1)
  })
})
