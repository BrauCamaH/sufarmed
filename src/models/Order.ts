import { Product } from './Product';
import { Multimedia } from './Multimedia';
export interface Order {
  id: number;
  img: Multimedia;
  name: string;
  products: Product[];
}
