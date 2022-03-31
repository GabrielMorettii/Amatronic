import { ICreateGoodImageDTO } from "@modules/goods/dtos/ICreateGoodImageDTO";
import { IGoodImagesRepository } from "@modules/goods/repositories/IGoodImagesRepository";
import { GoodImage } from "../entities/GoodImage";
import {Repository, getRepository} from 'typeorm'

export class GoodImageRepository implements IGoodImagesRepository{
  repository: Repository<GoodImage>;

  constructor(){
    this.repository = getRepository(GoodImage)
  }

  async create({good_id, image_name} : ICreateGoodImageDTO): Promise<GoodImage> {
    const goodImage = this.repository.create({good_id, name: image_name});

    await this.repository.save(goodImage);

    return goodImage;
  }

  async findByGoodId(good_id: string): Promise<GoodImage> {
    return this.repository.findOne({good_id})
  }

  async removeAllImages(good_id: string): Promise<void> {
    await this.repository
    .createQueryBuilder()
    .delete()
    .where("good_id = :id", {id: good_id})
    .execute()

  }
}
