import { useContext, useEffect } from 'react';
import {
  __deleteBrowserCookie,
  __getBrowserAuthCookie,
  __setBrowserAuthCookie,
} from '../utils/cookie.util';
import { IAuthLoginParams } from '../interfaces/auth.interface';
import { usePostLogin } from './auth/usePostLogin';
import { IApiBaseResponse } from '../interfaces/base-response.interface';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { TOKEN_NAME } from '../constant/variables.constant';

export const useAuth = () => {
  const { push } = useRouter();

  const handleSucces = (data: IApiBaseResponse<any>) => {
    if (data.statusCode !== 200) {
      console.log('login gagal');
    }

    __setBrowserAuthCookie(TOKEN_NAME, data.data?.token);

    const token = __getBrowserAuthCookie(TOKEN_NAME);

    if (token?.length! > 0) {
      push('/admin/dashboard');
    }
  };

  const { postLogin, isPending } = usePostLogin({ handleSucces: handleSucces });

  const login = (userLogin: IAuthLoginParams) => {
    postLogin(userLogin);
  };

  const logout = () => {
    __deleteBrowserCookie(TOKEN_NAME);
  };

  return { login, logout, isPending };
};
