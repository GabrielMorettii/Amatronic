export interface ISales{
  id: string
}

interface ICreateOrderDTO{
  customer_id: string;
  total: number;
  sales: ISales[];
}

export {ICreateOrderDTO}
