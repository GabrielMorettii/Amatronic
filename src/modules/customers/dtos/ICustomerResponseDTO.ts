interface ICustomerResponseDTO{
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  admin: boolean;
  created_at: Date;
  updated_at: Date;
}

export {ICustomerResponseDTO}
