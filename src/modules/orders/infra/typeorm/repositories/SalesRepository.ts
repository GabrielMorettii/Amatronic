import { ISales } from "@modules/orders/dtos/ICreateOrderDTO";
import { ICreateSalesDTO } from "@modules/orders/dtos/ICreateSalesDTO";
import { IUpdateSalesDTO } from "@modules/orders/dtos/IUpdateSalesDTO";
import { ISalesRepository } from "@modules/orders/repositories/ISalesRepository";
import { getRepository, In, Repository } from "typeorm";
import { Sales } from "../entities/Sales";

export class SalesRepository implements ISalesRepository{
  repository: Repository<Sales>;

  constructor(){
    this.repository = getRepository(Sales);
  }

  async create({quantity, good}: ICreateSalesDTO): Promise<Sales> {
    const totalValue = Number(good.price) * Number(quantity)

    const sales = this.repository.create(
      {
        good_id: good.id,
        quantity,
        totalValue,
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
      return acc + Number(sale.totalValue)
    }, 0)

    return Number(balance.toFixed(2));
  }

  async list(): Promise<Sales[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Sales> {
    return await this.repository.findOne(id);
  }


  async update({id, val_unit, quantity, totalValue}: IUpdateSalesDTO): Promise<Sales> {
    const existentSale = await this.repository.findOne(id);

    if(quantity && val_unit){
      totalValue = Number(quantity) * Number(val_unit)
    } else if(quantity && !val_unit){
      totalValue = Number(quantity) * Number(existentSale.val_unit)
    } else {
      totalValue = Number(existentSale.quantity) * Number(val_unit)
    }

    totalValue = +totalValue.toFixed(2);

    const sale = this.repository.create({id, val_unit, quantity, totalValue})

    await this.repository.save(sale);

    return sale;
  }
}
