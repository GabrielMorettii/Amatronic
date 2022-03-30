import { ICreateGoodDTO } from "@modules/goods/dtos/ICreateGoodDTO";
import { IGoodsRepository } from "@modules/goods/repositories/IGoodsRepository";
import { getRepository, Repository } from "typeorm";
import { Good } from "../entities/Good";

export class GoodsRepository implements IGoodsRepository{
  repository: Repository<Good>;

  constructor(){
    this.repository = getRepository(Good);
  }
  async create(data: ICreateGoodDTO): Promise<Good> {
    const good = this.repository.create(data);

    await this.repository.save(good);

    return good;
  }
  async findByName(name: string): Promise<Good> {
    return await this.repository.findOne({name})
  }

}
