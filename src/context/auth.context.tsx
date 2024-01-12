import { createContext, useState } from 'react';
import { IAuthCredentialResponse } from '../interfaces/auth.interface';

interface IAuthContextProps {
  user: IAuthCredentialResponse | null;
  setUser: (user: IAuthCredentialResponse | null) => void;
}

const AuthContext = createContext<IAuthContextProps>({
  user: null,
  setUser: () => {},
});
