import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSalesUseCase } from "./ListSalesUseCase";

export class ListSalesController{
  async handle(request: Request, response: Response):Promise<Response>{
    const listSalesUseCase = container.resolve(ListSalesUseCase);

    const sales = await listSalesUseCase.execute()

    return response.json(sales);
  }
}

