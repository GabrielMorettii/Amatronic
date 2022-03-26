import { ICustomerResponseDTO } from "../dtos/ICustomerResponseDTO";
import { Customer } from "../infra/typeorm/entities/Customer";

class CustomerMap{
  static toDTO({id,name,email,created_at,updated_at}: Customer): ICustomerResponseDTO {
    const customer = {
      id,name,email,created_at,updated_at
    }

    return customer;
  }
}

export {CustomerMap}
