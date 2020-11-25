import { Order } from './Order';
export interface OrderDetail {
  id: number;
  quantity: number;
  price: number;
  discount: number;
  order: Order;
  product: number;
}
