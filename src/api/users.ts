/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from './index';
import { useMutation } from 'react-query';

import { User } from '../models/User';

interface UserApiResponse {
  jwt: string;
  user: User;
}

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any | undefined> => {
  const { data } = await axios.post<UserApiResponse>('/auth/local/', {
    identifier: email,
    password: password,
  });
  return data;
};

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<any | undefined> => {
  const { data } = await axios.post<UserApiResponse>('/auth/local/register', {
    name,
    email,
    password,
    username: email,
  });
  return data;
};

const updateUser = async ({
  userId,
  req,
}: {
  userId: number;
  req: any;
}): Promise<User> => {
  const { data } = await axios.put(`/users/${userId}`, req);
  return data;
};

export const useLogin = () => {
  return useMutation(login);
};

export const useCreateUser = () => {
  return useMutation(createUser);
};

export const useUpdateUser = () => {
  return useMutation(updateUser);
};
