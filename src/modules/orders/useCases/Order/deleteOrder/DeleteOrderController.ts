import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteOrderUseCase } from "./DeleteOrderUseCase";

export class DeleteOrderController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {id} = request.params;

    const deleteOrderUseCase = container.resolve(DeleteOrderUseCase);

    await deleteOrderUseCase.execute(id)

    return response.status(204).send();
  }
}

