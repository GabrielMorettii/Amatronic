import { Good } from "@modules/goods/infra/typeorm/entities/Good";

interface ICreateSalesDTO{
  quantity: number;
  good: Good;
}

export {ICreateSalesDTO}
