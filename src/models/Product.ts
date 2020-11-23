import { Multimedia } from './Multimedia';
export interface Product {
  id: number;
  price: number;
  stock?: number;
  img?: Multimedia;
  name: string;
  summary?: string;
  description?: string;
  presentation?: string;
  content_by_unit?: string;
  total_units?: string;
  formula?: string;
  dose?: string;
  indications?: string;
  administration?: string;
}
