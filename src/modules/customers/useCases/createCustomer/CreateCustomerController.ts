import { CustomerMap } from "@modules/customers/mappers/CustomerMap";
import { Request, Response } from "express";

import {container} from 'tsyringe';
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateCustomerController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {email,name,password} = request.body;

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase)

    const customerData = await createCustomerUseCase.execute({email,name,password});

    const customer = CustomerMap.toDTO(customerData);

    return response.status(201).json(customer)
  }
}

export {CreateCustomerController}
