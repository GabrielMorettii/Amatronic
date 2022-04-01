import { ISales } from "@modules/orders/dtos/ICreateOrderDTO";
import { ICreateSalesDTO } from "@modules/orders/dtos/ICreateSalesDTO";
import { IUpdateSalesDTO } from "@modules/orders/dtos/IUpdateSalesDTO";
import { Sales } from "@modules/orders/infra/typeorm/entities/Sales";
import { ISalesRepository } from "../ISalesRepository";

class FakeSalesRepository implements ISalesRepository{
  repository: Sales[] = [];

  async create({quantity, good}: ICreateSalesDTO): Promise<Sales> {
    const sales = new Sales();

    const totalValue = Number(good.price) * Number(quantity)

    Object.assign(sales, {
      good_id: good.id,
      quantity,
      totalValue,
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

    if(salesData.length !== sales.length){
      return undefined
    }

    const balance = salesData.reduce((acc, sale) => {
      return acc + Number(sale.totalValue)
    }, 0)

    return Number(balance.toFixed(2));
  }

  async list(): Promise<Sales[]> {
    return this.repository;
  }

  async findById(id: string): Promise<Sales> {
   return this.repository.find(sale => sale.id === id);
  }

  async update({id, val_unit, quantity, totalValue}: IUpdateSalesDTO): Promise<Sales> {
    const sale = await this.findById(id);

    if(quantity && val_unit){
      totalValue = Number(quantity) * Number(val_unit)
    } else if(quantity && !val_unit){
      totalValue = Number(quantity) * Number(sale.val_unit)
    } else {
      totalValue = Number(sale.quantity) * Number(val_unit)
    }

    totalValue = +totalValue.toFixed(2);

    Object.assign(sale, {
      id, val_unit, quantity, totalValue
    })

    return sale;
  }
}

export {FakeSalesRepository}
