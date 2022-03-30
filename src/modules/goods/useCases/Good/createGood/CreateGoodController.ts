import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateGoodUseCase } from "./CreateGoodUseCase";

export class CreateGoodController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {amount, name, price, description,category_id,brand_id} = request.body;

    const createGoodUseCase = container.resolve(CreateGoodUseCase);

    const good = await createGoodUseCase.execute({amount, name, price, description,category_id,brand_id});

    return response.status(201).json(good);
  }
}

