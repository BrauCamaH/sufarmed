export interface Product {
  id: number;
  price: number;
  stock?: number;
  img?: {
    name?: string;
    url: string;
    formats: {
      large: {
        url: string;
      };
      medium: {
        url: string;
      };
      small: {
        url: string;
      };
      thumbnail: {
        url: string;
      };
    };
  };
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
