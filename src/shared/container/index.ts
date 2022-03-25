import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository'
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository'
import {container} from 'tsyringe'

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository)
