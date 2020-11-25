import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

export const useQueryCart = (token: string, userId?: number) => {
  return useQuery('order-details', async () => {
    const { data } = await axios.get(`/orders?user=${userId}&status=created`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });
};

export const updateOrder = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: number;
  data: { status: string; ship_date?: string };
}): Promise<unknown> => {
  const { data: response } = await axios.put(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  return response;
};

export const createOrder = async ({
  token,
  user,
}: {
  token: string;
  user: number;
}): Promise<any> => {
  const { data } = await axios.post(
    '/orders',
    { status: 'created', user },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const deleteOrder = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}): Promise<any> => {
  const { data } = await axios.delete(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
