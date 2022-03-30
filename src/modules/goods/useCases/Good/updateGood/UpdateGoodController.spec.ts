import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';
import request from 'supertest'
import {app} from '@shared/infra/http/app'
import {v4 as uuidv4} from 'uuid'
import {hash} from 'bcrypt'


let connection: Connection;
let tokenAuth = null;
let categoryId = null;
let brandId = null;

describe('Update Good Controller', ()=>{
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

    const responseCategory = await request(app).post('/categories').send({
      name: "Description Name",
      description: "Description Test"
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const responseBrand = await request(app).post('/brands').send({
      name: "Samsung",
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const {id: category_id} = responseCategory.body;
    const {id: brand_id} = responseBrand.body;

    categoryId = category_id;
    brandId = brand_id;
  })

  afterAll(async ()=>{
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to update a good', async ()=>{
    const responseGood = await request(app).post('/goods').send({
      name: "Iphone X",
      amount: 9,
      price: 1000.32,
      description: "Iphone da 10 geração",
      category_id: categoryId,
      brand_id: brandId
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const {id} = responseGood.body

    const response = await request(app).put(`/goods/${id}`).send({
      name: "Iphone XX",
      amount: 8,
      price: 2000.32,
      category_id: categoryId,
      description: "Iphone da 20 geração",
      brand_id: brandId
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toEqual("Iphone da 20 geração");
    expect(response.status).toBe(200)
  })

  it('Should not be able to update a non-existent good', async ()=>{
    const id = uuidv4();

    const response = await request(app).put(`/goods/${id}`).send({
      name: "Iphone XX",
      amount: 8,
      price: 2000.32,
      category_id: '123',
      description: "Iphone da 20 geração",
      brand_id: '123'
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(404);
  })

  it('Should not be able to update a good with non-existent category', async ()=>{
    const responseGood = await request(app).post('/goods').send({
      name: "Iphone X",
      amount: 9,
      price: 1000.32,
      description: "Iphone da 10 geração",
      category_id: categoryId,
      brand_id: brandId
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    });

    const {id} = responseGood.body

    const category_id = uuidv4();

    const response = await request(app).put(`/goods/${id}`).send({
      name: "Iphone XXX",
      amount: 8,
      price: 2000.32,
      description: "Iphone da 20 geração",
      category_id,
      brand_id: '123'
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(404);
  })

  it('Should not be able to update a good with non-existent brand', async ()=>{
    const responseGood = await request(app).post('/goods').send({
      name: "Iphone XIV",
      amount: 9,
      price: 1000.32,
      description: "Iphone da 10 geração",
      category_id: categoryId,
      brand_id: brandId
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    });

    const {id} = responseGood.body

    const brand_id = uuidv4();

    const response = await request(app).put(`/goods/${id}`).send({
      name: "Iphone XXX",
      amount: 8,
      price: 2000.32,
      description: "Iphone da 20 geração",
      category_id: categoryId,
      brand_id,
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(404);
  })
})
