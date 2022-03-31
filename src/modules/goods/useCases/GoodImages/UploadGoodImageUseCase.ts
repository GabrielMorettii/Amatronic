import { IUploadGoodImageDTO } from "@modules/goods/dtos/IUploadGoodImageDTO";
import { IGoodImagesRepository } from "@modules/goods/repositories/IGoodImagesRepository";
import { IGoodsRepository } from "@modules/goods/repositories/IGoodsRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UploadGoodImageUseCase{
  constructor(
    @inject('GoodImagesRepository')
    private goodImagesRepository: IGoodImagesRepository,
    @inject('GoodsRepository')
    private goodsRepository: IGoodsRepository,
  ){}

  async execute({good_id,images_name}: IUploadGoodImageDTO) {
    const existentGood = await this.goodsRepository.findById(good_id);

    if(!existentGood){
      throw new AppError("The good does not exists", 404)
    }

    const existentImage = await this.goodImagesRepository.findByGoodId(good_id)

    if(existentImage){
      await this.goodImagesRepository.removeAllImages(good_id);
    }

    images_name.map(async(image_name) => {
      await this.goodImagesRepository.create({good_id, image_name})
    })
  }
}
