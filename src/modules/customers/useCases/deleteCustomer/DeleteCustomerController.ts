import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCustomerUseCase } from "./DeleteCustomerUseCase";

class DeleteCustomerController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;

    const deleteCustomerUseCase = container.resolve(DeleteCustomerUseCase)

    await deleteCustomerUseCase.execute(id);

    return response.status(204).send();
  }
}

export {DeleteCustomerController}
