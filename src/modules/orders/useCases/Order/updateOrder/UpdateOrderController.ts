import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateOrderUseCase } from "./UpdateOrderUseCase";

export class UpdateOrderController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {customer_id, sales,total} = request.body
    const {id} = request.params;

    const updateOrderUseCase = container.resolve(UpdateOrderUseCase);

    const order = await updateOrderUseCase.execute({id, customer_id, sales,total})

    return response.json(order);
  }
}

