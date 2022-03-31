import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

export class CreateOrderController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {sales} = request.body
    const {id: customer_id} = request.user;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    const order = await createOrderUseCase.execute(customer_id, sales)

    return response.status(201).json(order);
  }
}

