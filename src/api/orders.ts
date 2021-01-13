import axios from './index';
import { QueryResult, useMutation, useQuery } from 'react-query';
import { Order } from '../models/Order';
import { PaymentIntent } from '@stripe/stripe-js';

export const useQueryCart = (
  token: string,
  userId?: number
): QueryResult<Order[], unknown> => {
  return useQuery(`orders_by_${userId}_with_${token}`, async () => {
    const { data } = await axios.get(`/orders?user=${userId}&status=created`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });
};

export const useQueryPaidOrders = ({
  shoppingId,
  token,
  userId,
  page,
}: {
  shoppingId: number;
  token: string;
  userId?: number;
  page: number;
}): QueryResult<Order[], unknown> => {
  const start = (page - 1) * 10;

  return useQuery(
    `paid_orders_by_${userId}_session_${token}_page_${page}_updated_at_${shoppingId}`,
    async () => {
      const { data } = await axios.get<Order[]>(
        `/orders?user=${userId}&status=paid&_start=${start}&_limit=10&_sort=updated_at:DESC`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    }
  );
};

export const useGetShoppingCount = (
  shoppingId: number,
  userId: number
): QueryResult<number, unknown> => {
  return useQuery(
    `shopping_count_${userId}_updated_at_${shoppingId}`,
    async () => {
      const { data } = await axios.get(
        `/orders/count?user=${userId}&status=paid`
      );
      return data;
    }
  );
};

export const updateOrder = async ({
  id,
  data,
}: {
  id: number;
  data: {
    status: string;
    ship_date?: string;
    address: string;
    name: string;
    city: string;
    state: string;
    phone: string;
    indications?: string;
  };
}): Promise<Order> => {
  const { data: response } = await axios.put<Order>(`/orders/${id}`, data);
  return response;
};

export const createOrder = async ({
  user,
}: {
  user: number;
}): Promise<Order> => {
  const { data } = await axios.post<Order>('/orders', {
    status: 'created',
    user,
  });
  return data;
};

export const deleteOrder = async ({ id }: { id: number }): Promise<Order> => {
  const { data } = await axios.delete<Order>(`/orders/${id}`);
  return data;
};

export const createPayment = async ({
  amount,
}: {
  amount: number;
}): Promise<PaymentIntent> => {
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
