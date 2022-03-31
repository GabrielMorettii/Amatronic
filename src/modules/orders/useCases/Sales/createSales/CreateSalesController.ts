import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSalesUseCase } from "./CreateSalesUseCase";

export class CreateSalesController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {good_id, quantity} = request.body

    const createSalesUseCase = container.resolve(CreateSalesUseCase);

    const sales = await createSalesUseCase.execute(good_id, quantity)

    return response.status(201).json(sales);
  }
}

