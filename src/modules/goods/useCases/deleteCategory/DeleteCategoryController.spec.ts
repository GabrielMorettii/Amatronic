import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';
import request from 'supertest'
import {app} from '@shared/infra/http/app'
import {v4 as uuidv4} from 'uuid'
import {hash} from 'bcrypt'


let connection: Connection;
let tokenAuth = null;

describe('Delete Category Controller', ()=>{
  beforeAll(async ()=>{
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();

    const password = await hash('gabrieldev', 8)

    await connection.query(`INSERT INTO customers
    (id, name, email, password, avatar, admin, created_at, updated_at)
    VALUES('${id}', 'adminAmatronic', 'gabrieldev@gmail.com', '${password}',
    null, true, 'now()', 'now()')`)

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

  it('Should be able to delete a category', async ()=>{
    const responseCategory = await request(app).post('/categories').send({
      name: "Description Name",
      description: "Description Test"
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const id = responseCategory.body.id

    const response = await request(app).delete(`/categories/${id}`).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(204)
  })

  it('Should not be able to delete a non-existent category', async ()=>{
    const id = uuidv4();

    const response = await request(app).delete(`/categories/${id}`).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(404)
  })
})
