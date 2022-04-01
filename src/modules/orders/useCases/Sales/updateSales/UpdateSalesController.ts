import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateSalesUseCase } from "./UpdateSalesUseCase";

export class UpdateSalesController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {val_unit, quantity, totalValue} = request.body;
    const {id} = request.params

    const updateSalesUseCase = container.resolve(UpdateSalesUseCase);

    const sale = await updateSalesUseCase.execute({id, val_unit, quantity, totalValue})

    return response.json(sale);
  }
}

