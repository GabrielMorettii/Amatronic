import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateCustomerUseCase } from "./AuthenticateCustomerUseCase";

class AuthenticateCustomerController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {email, password} = request.body;

    const authenticateCustomerUseCase = container.resolve(AuthenticateCustomerUseCase);

    const responseToken = await authenticateCustomerUseCase.execute({email, password});

    return response.json(responseToken);
  }
}

export {AuthenticateCustomerController}
