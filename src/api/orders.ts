import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

export const useQueryOrders = async ({
  token,
  userId,
}: {
  token: string;
  userId: number;
}): Promise<unknown> => {
  return useQuery('orders', async () => {
    const { data } = await axios.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });
};

export const useQueryOrderDetails = async ({
  token,
  orderId,
}: {
  token: string;
  orderId: number;
}): Promise<unknown> => {
  return useQuery('orders', async () => {
    const { data } = await axios.get(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });
};

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
}): Promise<unknown> => {
  const { data } = await axios.post('/order-detail', {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      product: productId,
      order: orderId,
      price,
      quantity,
    },
  });
  return data;
};
export const deleteOrderDetail = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}): Promise<unknown> => {
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
  data: { quantity: number; price: number; discount: number };
}): Promise<unknown> => {
  const { data: response } = await axios.put(`/order-details/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  return response;
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
  const { data: response } = await axios.put(`/order/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  return response;
};

export const createOrder = async ({
  token,
}: {
  token: string;
}): Promise<unknown> => {
  const { data } = await axios.post('/orders', {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      status: 'created',
    },
  });
  return data;
};

export const deleteOrder = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}): Promise<unknown> => {
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

export const useCreateOrderDetail = () => {
  return useMutation(createOrderDetail);
};

export const useDeleteOrderDetail = () => {
  return useMutation(deleteOrderDetail);
};

export const useUpdateOrderDetail = () => {
  return useMutation(updateOrderDetail);
};
