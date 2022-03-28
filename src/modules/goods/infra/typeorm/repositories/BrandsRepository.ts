import { IBrandsRepository } from "@modules/goods/repositories/IBrandsRepository";
import { getRepository, Repository } from "typeorm";
import { Brand } from "../entities/Brand";

class BrandsRepository implements IBrandsRepository{
  repository: Repository<Brand>;

  constructor(){
    this.repository = getRepository(Brand);
  }

  async create(name: string): Promise<Brand> {
    const brand = this.repository.create({name});

    await this.repository.save(brand);

    return brand;
  }
  async findByName(name: string): Promise<Brand> {
    return await this.repository.findOne({name})
  }

  async list(): Promise<Brand[]> {
    return await this.repository.find()
  }

  async findById(id: string): Promise<Brand> {
    return await this.repository.findOne(id)
  }

  async update(id: string, name: string): Promise<Brand> {
    const brand = this.repository.create({
      id, name, updated_at: `${new Date(Date.now())}`
    })

    await this.repository.save(brand);

    return brand;
  }

}

export {BrandsRepository}
