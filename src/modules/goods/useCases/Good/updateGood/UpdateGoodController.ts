import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateGoodsUseCase } from "./UpdateGoodUseCase";

export class UpdateGoodController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {id} = request.params
    const {amount, name, price, description,category_id,brand_id} = request.body;

    const updateGoodsUseCase = container.resolve(UpdateGoodsUseCase);

    const good = await updateGoodsUseCase.execute({id, amount, name, price, description,category_id,brand_id})

    return response.json(good);
  }
}

