import { ISales } from "../dtos/ICreateOrderDTO";
import { ICreateSalesDTO } from "../dtos/ICreateSalesDTO";
import { Sales } from "../infra/typeorm/entities/Sales";

interface ISalesRepository{
  create(data: ICreateSalesDTO): Promise<Sales>
  getSalesById(sales: ISales[]): Promise<Sales[]>
  getTotal(sales: ISales[]): Promise<number>
}

export {ISalesRepository}
