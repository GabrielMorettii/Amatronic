import { ICreateGoodDTO } from '@modules/goods/dtos/ICreateGoodDTO';
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
}

export {FakeGoodsRepository}
