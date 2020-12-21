import { OrderDetail } from './OrderDetail';
export interface Order {
  id: number;
  total?: number;
  ship_date: string;
  paid_date?: string;
  status: string;
  payment: 'cash' | 'credit_card' | 'debit_card';
  order_details: OrderDetail[];
  updated_at?: string;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  indications?: string;
}
