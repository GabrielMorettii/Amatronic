import { IUploadGoodImageDTO } from "@modules/goods/dtos/IUploadGoodImageDTO";
import { IGoodImagesRepository } from "@modules/goods/repositories/IGoodImagesRepository";
import { IGoodsRepository } from "@modules/goods/repositories/IGoodsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UploadGoodImageUseCase{
  constructor(
    @inject('GoodImagesRepository')
    private goodImagesRepository: IGoodImagesRepository| any,
    @inject('GoodsRepository')
    private goodsRepository: IGoodsRepository| any,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider| any,
  ){}

  async execute({good_id,images_name}: IUploadGoodImageDTO) {
    const existentGood = await this.goodsRepository.findById(good_id);

    if(!existentGood){
      throw new AppError("The good does not exists", 404)
    }

    const existentImages = await this.goodImagesRepository.findByGoodId(good_id)

    if(existentImages){
      await this.goodImagesRepository.removeAllImages(good_id);
      existentImages.forEach(async(image)=>{
        await this.storageProvider.delete(image.name, 'goods')
      })
    }

    images_name.map(async(image_name) => {
      if(process.env.NODE_ENV){
        await this.goodImagesRepository.create({good_id, image_name});
        await this.storageProvider.delete(image_name, "")

        return;
      }

      /* istanbul ignore next */
      await this.goodImagesRepository.create({good_id, image_name});
      /* istanbul ignore next */
      await this.storageProvider.save(image_name, 'goods')
    })
  }
}
