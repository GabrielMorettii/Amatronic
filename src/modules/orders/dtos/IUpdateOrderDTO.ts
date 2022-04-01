import { ISales } from "./ICreateOrderDTO";

export interface IUpdateOrderDTO{
  id: string
  customer_id?: string;
  total?: number;
  sales?: ISales[];
}
