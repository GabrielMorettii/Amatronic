import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

class UpdateCustomerController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {email, name, avatar} = request.body;
    const {id} = request.user;

    const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase);

    const costumer = await updateCustomerUseCase.execute({
      id, email, name, avatar
    })

    return response.json(costumer)
  }
}

export {UpdateCustomerController}
