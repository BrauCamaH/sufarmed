/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from './index';
import { useMutation } from 'react-query';
import { Address } from '../models/Address';

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

export const useCreateAddress = () => {
  return useMutation(createAddress);
};
