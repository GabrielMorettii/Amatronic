import { Good } from "@modules/goods/infra/typeorm/entities/Good";
import { IGoodsRepository } from "@modules/goods/repositories/IGoodsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListGoodsUseCase{
  constructor(
    @inject('GoodsRepository')
    private goodsRepository: IGoodsRepository| any,
  ){}

  async execute(): Promise<Good[]>{
    const goods = await this.goodsRepository.list();

    return goods;
  }
}

export {ListGoodsUseCase}
