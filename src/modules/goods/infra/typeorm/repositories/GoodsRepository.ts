import { ICreateGoodDTO } from "@modules/goods/dtos/ICreateGoodDTO";
import { IUpdateGoodDTO } from "@modules/goods/dtos/IUpdateGoodDTO";
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

  async list(): Promise<Good[]> {
    return await this.repository.find();
  }
  async findById(id: string): Promise<Good> {
    return await this.repository.findOne(id)
  }

  async update({id,amount, name, price, description,category_id,brand_id }: IUpdateGoodDTO): Promise<Good> {
    const good = this.repository.create({
      id,amount, name, price, description,category_id,brand_id, updated_at: `${new Date(Date.now())}`
    })

    await this.repository.save(good)

    return good;
  }
}
