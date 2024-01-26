import { createContext, useState, useEffect, ReactNode } from 'react';
import { IAuthCredentialResponse } from '../interfaces/auth.interface';
import { useQuery } from '@tanstack/react-query';
import { IAuthUserCredentialQuery } from '@/pages/api/auth/auth-query';
import { __getBrowserAuthCookie } from '../utils/cookie.util';
import { TOKEN_NAME } from '../constant/variables.constant';

interface IUserContextProps {
  user: IAuthCredentialResponse | null;
}

interface IUserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<IUserContextProps>({ user: null });

export function UserCredential({ children }: IUserProviderProps) {
  const [user, setUser] = useState<any>(null);
  const token = __getBrowserAuthCookie(TOKEN_NAME);

  const {
    data: userCredential,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['user-credentials-id-key', token],
    queryFn: IAuthUserCredentialQuery,
  });

  useEffect(() => {
    setUser(userCredential);
  }, [userCredential, isSuccess]);


  return (
    <UserContext.Provider value={{ user: user?.user! }}>
      {children}
    </UserContext.Provider>
  );
}
