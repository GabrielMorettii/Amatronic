import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateBrandUseCase } from "./UpdateBrandUseCase";

class UpdateBrandController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {id} = request.params;
    const {name} = request.body;

    const updateBrandUseCase = container.resolve(UpdateBrandUseCase);

    const brand = await updateBrandUseCase.execute(id, name);

    return response.json(brand);
  }
}

export {UpdateBrandController}
