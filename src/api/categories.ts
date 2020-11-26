/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { useQuery } from 'react-query';

export const useQueryCategories = () => {
  return useQuery('categories', async () => {
    const { data } = await axios.get('/categories');
    return data;
  });
};

export const useQueryCategoryById = (id: number) => {
  return useQuery(`category_by_${id}`, async () => {
    const { data } = await axios.get(`/categories/${id}`);
    return data;
  });
};
