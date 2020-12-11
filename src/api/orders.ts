/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from './index';
import { useMutation, useQuery } from 'react-query';

export const useQueryCart = (token: string, userId?: number) => {
  return useQuery(`orders_by_${userId}_${token}`, async () => {
    const { data } = await axios.get(`/orders?user=${userId}&status=created`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });
};

export const useQueryPaidOrders = (token: string, userId?: number) => {
  return useQuery(`paid_orders_by_${userId}_${token}`, async () => {
    const { data } = await axios.get(`/orders?user=${userId}&status=paid`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });
};

export const updateOrder = async ({
  id,
  data,
}: {
  id: number;
  data: { status: string; ship_date?: string };
}): Promise<unknown> => {
  const { data: response } = await axios.put(`/orders/${id}`, data);
  return response;
};

export const createOrder = async ({ user }: { user: number }): Promise<any> => {
  const { data } = await axios.post('/orders', { status: 'created', user });
  return data;
};

export const deleteOrder = async ({ id }: { id: number }): Promise<any> => {
  const { data } = await axios.delete(`/orders/${id}`);
  return data;
};

export const createPayment = async ({ amount }: { amount: number }) => {
  const { data } = await axios.post(`/payments`, { amount });
  return data;
};

export const useCreateOrder = () => {
  return useMutation(createOrder);
};

export const useDeleteOrder = () => {
  return useMutation(deleteOrder);
};

export const useUpdateOrder = () => {
  return useMutation(updateOrder);
};

export const useCreatePayment = () => {
  return useMutation(createPayment);
};
