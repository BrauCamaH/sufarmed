/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    const { data } = await axios.post('/auth/local/', {
      identifier: email,
      password: password,
    });
    return data;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};

export const createUser = async (
  name: string,
  last_name: string,
  email: string,
  password: string
) => {
  try {
    const { data } = await axios.post('/auth/local/register', {
      name,
      email,
      last_name,
      password,
      username: name,
    });
    return data;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};
