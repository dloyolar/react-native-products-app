import {useEffect, useState} from 'react';
import {Categoria} from '../interfaces/appInterfaces';
import coffeApi from '../api/coffeApi';

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const {data} = await coffeApi.categories();
    setCategories([...data.categorias]);
    setIsLoading(false);
  };

  return {categories, isLoading};
};
