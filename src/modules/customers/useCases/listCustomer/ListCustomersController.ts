import { CustomerMap } from "@modules/customers/mappers/CustomerMap";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCustomersUseCase } from "./ListCustomersUseCase";

class ListCustomersController{
  async handle(request: Request, response: Response): Promise<Response>{
    const listCustomersUseCase = container.resolve(ListCustomersUseCase)

    const customerData = await listCustomersUseCase.execute();

    const customers = CustomerMap.toDTOS(customerData);

    return response.json(customers)
  }
}

export {ListCustomersController}
