import { ICreateGoodDTO } from '@modules/goods/dtos/ICreateGoodDTO';
import { IUpdateGoodDTO } from '@modules/goods/dtos/IUpdateGoodDTO';
import { Good } from '@modules/goods/infra/typeorm/entities/Good';
import {IGoodsRepository} from '../IGoodsRepository'

class FakeGoodsRepository implements IGoodsRepository{
  repository: Good[] = [];

  async create(data: ICreateGoodDTO): Promise<Good> {
    const good = new Good();

    Object.assign(good, {...data});

    this.repository.push(good);

    return good;
  }

  async findByName(name: string): Promise<Good> {
    return this.repository.find(good => good.name === name)
  }

  async list(): Promise<Good[]> {
    return this.repository;
  }

  async findById(id: string): Promise<Good> {
    return this.repository.find(good => good.id === id)
  }

  async update({id, amount, name, price, description,category_id,brand_id }: IUpdateGoodDTO): Promise<Good> {
    const good = await this.findById(id);

    Object.assign(good, {amount, name, price, description,category_id,brand_id})

    return good;
  }
}

export {FakeGoodsRepository}
