import createConnection from '@shared/infra/typeorm'
import { hash } from 'bcrypt';
import {v4 as uuidv4} from 'uuid'

async function create(){
  const connection = await createConnection();

  const id = uuidv4();

  const password = await hash('gabrieldev', 8)

  await connection.query(`INSERT INTO customers
  (id, name, email, password, avatar, admin, created_at, updated_at)
  VALUES('${id}', 'adminAmatronic', 'gabrieldev@gmail.com', '${password}',
  null, true, 'now()', 'now()')`)

  await connection.close();
}

create().then(()=>{
  console.log('User admin created sucessufully!')
})
