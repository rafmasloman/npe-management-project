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
import { ROUTES } from '../constant/routes.constant';
import Notifications from '../components/notifications/notification.component';

export const useAuth = () => {
  const { push, replace } = useRouter();

  const handleSucces = (data: IApiBaseResponse<any>) => {
    if (data.statusCode !== 200) {
      Notifications({
        message: 'Email atau Password salah',
        title: 'Login Gagal',
        status: 'FAILED',
      });
    }

    __setBrowserAuthCookie(TOKEN_NAME, data.data?.token);

    const token = __getBrowserAuthCookie(TOKEN_NAME);

    if (token?.length! > 0) {
      Notifications({
        message: 'Berhasil Login',
        title: 'Login Berhasil',
        status: 'SUCCESS',
      });

      push('/dashboard');
    }
  };

  const { postLogin, isPending } = usePostLogin({ handleSucces: handleSucces });

  const login = (userLogin: IAuthLoginParams) => {
    postLogin(userLogin);
  };

  const logout = () => {
    __deleteBrowserCookie(TOKEN_NAME);

    replace(ROUTES.HOMEPAGE);
  };

  return { login, logout, isPending };
};
