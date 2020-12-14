import { OrderDetail } from './OrderDetail';
export interface Order {
  id: number;
  ship_date: string;
  status: string;
  payment: 'cash' | 'credit_card' | 'debit_card';
  order_details: OrderDetail[];
  updated_at?: string;
}
