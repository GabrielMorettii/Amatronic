import {Brand} from '../infra/typeorm/entities/Brand'

interface IBrandsRepository{
  create(name: string): Promise<Brand>
  findByName(name: string): Promise<Brand>
  findById(id: string): Promise<Brand>
  list(): Promise<Brand[]>
  update(id: string, name: string): Promise<Brand>
}

export {IBrandsRepository}
