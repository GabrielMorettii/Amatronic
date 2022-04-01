import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';
import request from 'supertest'
import {app} from '@shared/infra/http/app'
import {v4 as uuidv4} from 'uuid'
import {hash} from 'bcrypt'


let connection: Connection;
let tokenAuth = null;

describe('Update Order Controller', ()=>{
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

  it('Should be able to update a order', async ()=>{
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

    const responseGood = await request(app).post('/goods').send({
      name: "Iphone X",
      amount: 9,
      price: 1000.32,
      description: "Iphone da 10 geração",
      category_id,
      brand_id
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const {id: good_id} = responseGood.body

    const responseSale = await request(app).post('/sales').send({
      good_id,
      quantity: 2,
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const responseSaleTwo = await request(app).post('/sales').send({
      good_id,
      quantity: 3,
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const {id: sale_id} = responseSale.body;
    const {id: saleTwo_id} = responseSaleTwo.body;

    const responseOrder = await request(app).post('/orders').send({
      sales: [
        {
          id: sale_id
        }
      ]
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const orderId = responseOrder.body.id;

    const response = await request(app).put(`/orders/${orderId}`).send({
      sales: [
        {
          id: saleTwo_id
        }
      ]
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(200);
    expect(response.body.total).toEqual(3000.96);
  })

  it('Should not be able to update a non-existent order', async ()=>{
    const response = await request(app).put(`/orders/${uuidv4()}`).send({
      sales: [
        {
          id: uuidv4()
        }
      ]
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(404);
  })

  it('Should not be able to update a order with non-existent sales', async ()=>{
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

    const responseGood = await request(app).post('/goods').send({
      name: "Iphone X",
      amount: 9,
      price: 1000.32,
      description: "Iphone da 10 geração",
      category_id,
      brand_id
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const {id: good_id} = responseGood.body

    const responseSale = await request(app).post('/sales').send({
      good_id,
      quantity: 2,
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const {id: sale_id} = responseSale.body;

    const responseOrder = await request(app).post('/orders').send({
      sales: [
        {
          id: sale_id
        }
      ]
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    const orderId = responseOrder.body.id;

    const response = await request(app).put(`/orders/${orderId}`).send({
      sales: [
        {
          id: uuidv4()
        }
      ]
    }).set({
      Authorization: `Bearer ${tokenAuth}`
    })

    expect(response.status).toBe(404);
  })
})
