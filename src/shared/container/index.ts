import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository'
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository'
import { BrandsRepository } from '@modules/goods/infra/typeorm/repositories/BrandsRepository'
import { IBrandsRepository } from '@modules/goods/repositories/IBrandsRepository'
import {container} from 'tsyringe'

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository)
container.registerSingleton<IBrandsRepository>('BrandsRepository', BrandsRepository)
