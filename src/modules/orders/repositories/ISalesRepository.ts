import { ISales } from "../dtos/ICreateOrderDTO";
import { ICreateSalesDTO } from "../dtos/ICreateSalesDTO";
import { IUpdateSalesDTO } from "../dtos/IUpdateSalesDTO";
import { Sales } from "../infra/typeorm/entities/Sales";

interface ISalesRepository{
  create(data: ICreateSalesDTO): Promise<Sales>
  getSalesById(sales: ISales[]): Promise<Sales[]>
  getTotal(sales: ISales[]): Promise<number>
  list(): Promise<Sales[]>
  update(data: IUpdateSalesDTO): Promise<Sales>
  findById(id: string): Promise<Sales>
  delete(id: string): Promise<void>
}

export {ISalesRepository}
