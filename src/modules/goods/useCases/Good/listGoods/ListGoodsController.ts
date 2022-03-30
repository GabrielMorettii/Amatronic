import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListGoodsUseCase } from "./ListGoodsUseCase";

export class ListGoodsController{
  async handle(request: Request, response: Response):Promise<Response>{
    const listGoodsUseCase = container.resolve(ListGoodsUseCase);

    const goods = await listGoodsUseCase.execute()

    return response.json(goods);
  }
}

