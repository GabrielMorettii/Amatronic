import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository'
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository'
import { BrandsRepository } from '@modules/goods/infra/typeorm/repositories/BrandsRepository'
import { CategoriesRepository } from '@modules/goods/infra/typeorm/repositories/CategoriesRepository'
import { GoodsRepository } from '@modules/goods/infra/typeorm/repositories/GoodsRepository'
import { GoodImageRepository } from '@modules/goods/infra/typeorm/repositories/GoodImageRepository'
import { IBrandsRepository } from '@modules/goods/repositories/IBrandsRepository'
import { ICategoriesRepository } from '@modules/goods/repositories/ICategoriesRepository'
import { IGoodsRepository } from '@modules/goods/repositories/IGoodsRepository'
import { IGoodImagesRepository } from '@modules/goods/repositories/IGoodImagesRepository'
import {container} from 'tsyringe'
import './providers'
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository'
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository'
import { ISalesRepository } from '@modules/orders/repositories/ISalesRepository'
import { SalesRepository } from '@modules/orders/infra/typeorm/repositories/SalesRepository'

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository)
container.registerSingleton<IBrandsRepository>('BrandsRepository', BrandsRepository)
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<IGoodsRepository>('GoodsRepository', GoodsRepository)
container.registerSingleton<IGoodImagesRepository>('GoodImagesRepository', GoodImageRepository)
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository)
container.registerSingleton<ISalesRepository>('SalesRepository', SalesRepository)
