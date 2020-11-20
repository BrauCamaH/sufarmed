/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
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
  last_name,
  email,
  password,
}: {
  name: string;
  last_name: string;
  email: string;
  password: string;
}): Promise<any | undefined> => {
  const { data } = await axios.post<UserApiResponse>('/auth/local/register', {
    name,
    email,
    last_name,
    password,
    username: name,
  });
  return data;
};

export const useLogin = () => {
  return useMutation(login);
};

export const useCreateUser = () => {
  return useMutation(createUser);
};
