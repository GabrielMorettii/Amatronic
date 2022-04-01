import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteSalesUseCase } from "./DeleteSalesUseCase";

export class DeleteSalesController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {id} = request.params

    const deleteSalesUseCase = container.resolve(DeleteSalesUseCase);

    await deleteSalesUseCase.execute(id)

    return response.status(204).send()
  }
}

