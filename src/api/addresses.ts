/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from './index';
import { useMutation, useQuery } from 'react-query';
import { Address } from '../models/Address';

export const useGetAddressById = (id: number) => {
  return useQuery(`address-${id}`, async () => {
    const { data } = await axios.get<Address>(`/addresses/${id}`);
    return data;
  });
};

export const createAddress = async ({
  userId,
  address,
}: {
  userId: number;
  address: {
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    indications: string;
  };
}): Promise<Address> => {
  const { data } = await axios.post('/addresses', { ...address, user: userId });
  return data;
};

export const editAddress = async (address: Address): Promise<Address> => {
  const { data } = await axios.put(`/addresses/${address.id}`, address);
  return data;
};

export const deleteAddress = async (addressId: number): Promise<Address> => {
  const { data } = await axios.delete(`/addresses/${addressId}`);
  return data;
};

export const useCreateAddress = () => {
  return useMutation(createAddress);
};

export const useEditAddress = () => {
  return useMutation(editAddress);
};

export const useDeleteAddress = () => {
  return useMutation(deleteAddress);
};
