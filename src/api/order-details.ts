import axios from 'axios';
import { useMutation } from 'react-query';

export const createOrderDetail = async ({
  token,
  productId,
  orderId,
  price,
  quantity,
}: {
  token: string;
  productId: number;
  orderId: number;
  price: number;
  quantity: number;
}): Promise<any> => {
  const { data } = await axios.post(
    '/order-details',
    { product: productId, order: orderId, price, quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const deleteOrderDetail = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}): Promise<any> => {
  const { data } = await axios.delete(`/order-details/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateOrderDetail = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: number;
  data: { quantity: number; price?: number; discount?: number };
}): Promise<any> => {
  const { data: response } = await axios.put(`/order-details/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
