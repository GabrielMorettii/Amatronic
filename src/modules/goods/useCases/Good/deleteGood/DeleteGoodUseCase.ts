import { IGoodsRepository } from "@modules/goods/repositories/IGoodsRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteGoodUseCase{
  constructor(
    @inject('GoodsRepository')
    private goodsRepository: IGoodsRepository| any,
  ){}

  async execute(id: string): Promise<void>{
    const existentGood = await this.goodsRepository.findById(id);

    if(!existentGood){
      throw new AppError('Good was not found!', 404);
    }

    await this.goodsRepository.delete(id);
  }
}

export {DeleteGoodUseCase}
