import React, {createContext, useEffect, useState} from 'react';
import {Producto} from '../interfaces/appInterfaces';
import coffeApi from '../api/coffeApi';
import {ImagePickerResponse} from 'react-native-image-picker';
import coffeClient from '../api/coffeClient';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const {data} = await coffeApi.products();
    // setProducts([...products, ...data.productos]);
    setProducts([...data.productos]);
  };

  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    const params = {categoria: categoryId, nombre: productName};
    const {data} = await coffeApi.addProduct(params);
    setProducts([...products, data]);
    return data;
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const params = {nombre: productName, categoria: categoryId};
    const {data} = await coffeApi.updateProduct(productId, params);
    setProducts(products.map(prod => (prod._id === productId ? data : prod)));
  };

  const deleteProduct = async (id: string) => {};

  const loadProductById = async (id: string) => {
    const {data} = await coffeApi.productById(id);
    return data;
  };

  const uploadImage = async (imgData: ImagePickerResponse, id: string) => {
    const assets = imgData.assets?.[0];
    const fileToUpload = {
      uri: assets?.uri,
      type: assets?.type,
      name: assets?.fileName,
    };
    const formData = new FormData();
    formData.append('archivo', fileToUpload);
    try {
      const resp = await coffeClient.put(`/uploads/productos/${id}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
