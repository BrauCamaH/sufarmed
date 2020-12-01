import axios from './index';
import { useMutation } from 'react-query';

export const createOrderDetail = async ({
  productId,
  orderId,
  price,
  quantity,
}: {
  productId: number;
  orderId: number;
  price: number;
  quantity: number;
}): Promise<any> => {
  const { data } = await axios.post('/order-details', {
    product: productId,
    order: orderId,
    price,
    quantity,
  });
  return data;
};

export const deleteOrderDetail = async ({
  id,
}: {
  id: number;
}): Promise<any> => {
  const { data } = await axios.delete(`/order-details/${id}`);
  return data;
};

export const updateOrderDetail = async ({
  id,
  data,
}: {
  id: number;
  data: { quantity: number; price?: number; discount?: number };
}): Promise<any> => {
  const { data: response } = await axios.put(`/order-details/${id}`, data);
  return response;
};

export const useCreateOrderDetail = () => {
  return useMutation(createOrderDetail);
};

export const useDeleteOrderDetail = () => {
  return useMutation(deleteOrderDetail);
};

export const useUpdateOrderDetail = () => {
  return useMutation(updateOrderDetail);
};
