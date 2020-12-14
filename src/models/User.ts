import { Address } from './Address';

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  cellphone: string;
  location: string;
  addresses: Address[];
}
