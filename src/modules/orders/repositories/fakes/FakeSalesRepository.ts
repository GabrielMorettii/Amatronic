import { ISales } from "@modules/orders/dtos/ICreateOrderDTO";
import { ICreateSalesDTO } from "@modules/orders/dtos/ICreateSalesDTO";
import { Sales } from "@modules/orders/infra/typeorm/entities/Sales";
import { ISalesRepository } from "../ISalesRepository";

class FakeSalesRepository implements ISalesRepository{
  repository: Sales[] = [];

  async create({quantity, good}: ICreateSalesDTO): Promise<Sales> {
    const sales = new Sales();

    const total = Number(good.price) * Number(quantity)

    Object.assign(sales, {
      good_id: good.id,
      quantity,
      total,
      val_unit: good.price
    });

    this.repository.push(sales);

    return sales;
  }

  async getSalesById(sales: ISales[]): Promise<Sales[]> {
    const salesId = sales.map(sale => sale.id)

    const salesData = this.repository.filter(sale => {
      if(salesId.includes(sale.id)){
        return sale;
      }

      return null
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

export {FakeSalesRepository}
