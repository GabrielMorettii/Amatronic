import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteGoodUseCase } from "./DeleteGoodUseCase";

export class DeleteGoodController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {id} = request.params;

    const deleteGoodUseCase = container.resolve(DeleteGoodUseCase);

    await deleteGoodUseCase.execute(id);

    return response.status(204).send()
  }
}

