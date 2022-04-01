import { Order } from "../infra/typeorm/entities/Order";
import {ICreateOrderDTO} from '../dtos/ICreateOrderDTO'
import { IUpdateOrderDTO } from "../dtos/IUpdateOrderDTO";

interface IOrdersRepository{
  create(data: ICreateOrderDTO): Promise<Order>
  list(): Promise<Order[]>
  findById(id: string): Promise<Order>
  update(data: IUpdateOrderDTO): Promise<Order>
  delete(id: string): Promise<void>
}

export {IOrdersRepository}
