import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository'
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository'
import { BrandsRepository } from '@modules/goods/infra/typeorm/repositories/BrandsRepository'
import { CategoriesRepository } from '@modules/goods/infra/typeorm/repositories/CategoriesRepository'
import { GoodsRepository } from '@modules/goods/infra/typeorm/repositories/GoodsRepository'
import { IBrandsRepository } from '@modules/goods/repositories/IBrandsRepository'
import { ICategoriesRepository } from '@modules/goods/repositories/ICategoriesRepository'
import { IGoodsRepository } from '@modules/goods/repositories/IGoodsRepository'
import {container} from 'tsyringe'

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository)
container.registerSingleton<IBrandsRepository>('BrandsRepository', BrandsRepository)
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<IGoodsRepository>('GoodsRepository', GoodsRepository)
