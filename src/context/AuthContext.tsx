import React, {createContext, useReducer} from 'react';
import {User} from '../interfaces/appInterfaces';
import {authReducer, AuthState} from './authReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  singUp: () => void;
  signIn: () => void;
  logOut: () => void;
  removeError: () => void;
};

const AuthInitialSate: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, AuthInitialSate);

  const singUp = () => {};
  const signIn = () => {};
  const logOut = () => {};
  const removeError = () => {};

  return (
    <AuthContext.Provider
      value={{...state, singUp, signIn, logOut, removeError}}>
      {children}
    </AuthContext.Provider>
  );
};
