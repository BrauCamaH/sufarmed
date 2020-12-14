import { User } from './User';
export interface Address {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  indications: string;
  user: User;
}
