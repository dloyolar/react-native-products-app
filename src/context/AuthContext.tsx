import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {authReducer, AuthState} from './authReducer';
import {User, LoginData} from '../interfaces/appInterfaces';
import coffeApi from '../api/coffeApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  singUp: () => void;
  signIn: ({correo, password}: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const AuthInitialSate: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, AuthInitialSate);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const storageToken = await AsyncStorage.getItem('token');

    if (!storageToken) {
      return dispatch({type: 'notAuthenticated'});
    }

    const res = await coffeApi.auth.checkToken();

    if (res.status !== 200) {
      return dispatch({type: 'notAuthenticated'});
    }

    const {token, usuario: user} = res.data;
    await AsyncStorage.setItem('token', token);
    dispatch({type: 'signUp', payload: {token, user}});
  };

  const singUp = () => {};

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const {data} = await coffeApi.auth.login({
        correo,
        password,
      });

      const {token, usuario: user} = data;

      dispatch({type: 'signUp', payload: {token, user}});
      await AsyncStorage.setItem('token', token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Información incorrecta',
      });
    }
  };

  const logOut = () => {};

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{...state, singUp, signIn, logOut, removeError}}>
      {children}
    </AuthContext.Provider>
  );
};
