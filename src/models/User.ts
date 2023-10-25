import { Address } from './Address';

export interface User {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  location: string;
  addresses: Address[];
}
