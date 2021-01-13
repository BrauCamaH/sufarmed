import { useMutation } from 'react-query';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from './index';
import { useQuery } from 'react-query';
import { Order } from '../models/Order';

export const useGetCountByName = (text: string, page: number) => {
  const start = (page - 1) * 10;

  return useQuery(`count_product_by_${text}_in_${page}`, async () => {
    const { data } = await axios.get(
      `/products/count?name_contains=${text}&_start=${start}&_limit=10`
    );
    return data;
  });
};

export const useGetCountByCategory = (categoryId: number, page: number) => {
  const start = (page - 1) * 10;

  return useQuery(`count_product_by_${categoryId}`, async () => {
    const { data } = await axios.get(
      `/products/count?category=${categoryId}&_start=${start}&_limit=10`
    );
    return data;
  });
};

export const useGetProductsByName = (text: string, page: number) => {
  const start = (page - 1) * 10;

  return useQuery(`product_by_${text}_in_${page}`, async () => {
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

export const useGetProductById = (id: number, shoppingId: number) => {
  return useQuery(`product_${id}_updated_at_${shoppingId}`, async () => {
    const { data } = await axios.get(`/products/${id}`);
    return data;
  });
};

export const updateInventory = async (orderId: number): Promise<Order> => {
  const { data } = await axios.put(`/products/inventory/${orderId}`);
  return data;
};

export const useUpdateInventory = () => {
  return useMutation(updateInventory);
};
