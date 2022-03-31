import { ICreateGoodImageDTO } from "../dtos/ICreateGoodImageDTO"
import { GoodImage } from "../infra/typeorm/entities/GoodImage"

interface IGoodImagesRepository{
  create(data: ICreateGoodImageDTO): Promise<GoodImage>
  findByGoodId(good_id: string): Promise<GoodImage>
  removeAllImages(good_id: string): Promise<void>
}

export {IGoodImagesRepository}
