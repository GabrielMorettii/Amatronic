import { ICreateGoodImageDTO } from '@modules/goods/dtos/ICreateGoodImageDTO';
import { Good } from '@modules/goods/infra/typeorm/entities/Good';
import { GoodImage } from '@modules/goods/infra/typeorm/entities/GoodImage';
import {IGoodImagesRepository} from '../IGoodImagesRepository'

class FakeGoodImageRepository implements IGoodImagesRepository{
  repository: GoodImage[] = [];

  async create(data: ICreateGoodImageDTO): Promise<GoodImage> {
    const goodImage = new GoodImage();

    Object.assign(goodImage, {...data});

    this.repository.push(goodImage);

    return goodImage;
  }
  async findByGoodId(good_id: string): Promise<GoodImage[]> {
    return this.repository.filter(goodImage => goodImage.good_id === good_id);
  }
  async removeAllImages(good_id: string): Promise<void> {
    const goodImages = await this.findByGoodId(good_id)

    goodImages.forEach(image => {
      const imgIndex = this.repository.findIndex(img => img.name == image.name)

      this.repository.splice(imgIndex, 1)
    })
  }
}

export {FakeGoodImageRepository}
