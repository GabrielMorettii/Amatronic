import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBrandUseCase } from "./CreateBrandUseCase";

class CreateBrandController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {name} = request.body;

    const createBrandUseCase = container.resolve(CreateBrandUseCase);

    const brand = await createBrandUseCase.execute(name);

    return response.status(201).json(brand);
  }
}

export {CreateBrandController}
