/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { useQuery } from 'react-query';

export const useGetProductsByName = (text: string, page: number) => {
  const start = (page - 1) * 10;

  return useQuery(`product_by_${text}`, async () => {
    const { data } = await axios.get(
      `/products?name_contains=${text}&_start=${start}&_limit=10`
    );
    return data;
  });
};

export const useGetProductsByCategory = (categoryId: number, page: number) => {
  const start = (page - 1) * 10;

  return useQuery(`product_by_${categoryId}`, async () => {
    const { data } = await axios.get(
      `/products?category=${categoryId}&_start=${start}&_limit=10`
    );
    return data;
  });
};

export const useGetProductById = (id: number) => {
  return useQuery(`product_${id}`, async () => {
    const { data } = await axios.get(`/products/${id}`);
    return data;
  });
};
