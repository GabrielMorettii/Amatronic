import { ISales } from "@modules/orders/dtos/ICreateOrderDTO";
import { ICreateSalesDTO } from "@modules/orders/dtos/ICreateSalesDTO";
import { ISalesRepository } from "@modules/orders/repositories/ISalesRepository";
import { getRepository, In, Repository } from "typeorm";
import { Sales } from "../entities/Sales";

export class SalesRepository implements ISalesRepository{
  repository: Repository<Sales>;

  constructor(){
    this.repository = getRepository(Sales);
  }

  async create({quantity, good}: ICreateSalesDTO): Promise<Sales> {
    const total = Number(good.price) * Number(quantity)

    const sales = this.repository.create(
      {
        good_id: good.id,
        quantity,
        total,
        val_unit: good.price,
      }
    );

    await this.repository.save(sales);

    return sales;
  }

  async getSalesById(sales: ISales[]): Promise<Sales[]> {
    const salesId = sales.map(sale => sale.id)

    const salesData = await this.repository.find({
      where: {id: In(salesId)}
    })

    return salesData;
  }


  async getTotal(sales: ISales[]): Promise<number> {
    const salesData = await this.getSalesById(sales);

    const balance = salesData.reduce((acc, sale) => {
      return acc + Number(sale.total)
    }, 0)

    return Number(balance.toFixed(2));
  }
}
