import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';
import request from 'supertest'
import {app} from '@shared/infra/http/app'
import {v4 as uuidv4} from 'uuid'
import {hash} from 'bcrypt'

let connection: Connection;
let tokenAuth = null

describe('Update Category Controller', ()=>{
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

  it('Should be able to update a category', async ()=>{
    const responseCategory = await request(app).post('/categories').send({
      name: "Test Name",
      description: "Test Desc"
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const {id} = responseCategory.body;

    const response = await request(app).put(`/categories/${id}`).send({
      name: "Test Name2",
      description: "Test Desc"
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.body.id).toEqual(id);
    expect(response.body.name).toEqual("Test Name2");
  })

  it('Should not be able to update a non-existent category', async ()=>{
    const testUUID = uuidv4();

    const response = await request(app).put(`/categories/${testUUID}`).send({
      name: "Test Category",
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(404);
  })

  it('Should not be able to update a category with a name already existent', async ()=>{
    const responseCategory = await request(app).post('/categories').send({
      name: "Test Name3",
      description: "Test Desc3"
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const {id} = responseCategory.body;

    const response = await request(app).put(`/categories/${id}`).send({
      name: "Test Name2",
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(400);
  })

})
