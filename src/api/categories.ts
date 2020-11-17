/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { useQuery } from 'react-query';

export const useQueryCategories = () => {
  return useQuery('categories', async () => {
    const { data } = await axios.get('/categories');
    return data;
  });
};
