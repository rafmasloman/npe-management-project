import { API_ROUTES } from '@/src/constant/api-routes.constant';
import {
  IAuthLoginParams,
  IAuthRegisterParams,
} from '@/src/interfaces/auth.interface';

class AuthMutationAPI {
  static async login(params: IAuthLoginParams) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/${API_ROUTES.AUTH}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
          redirect: 'follow',
        },
      );

      const login = await response.json();

      return login;
    } catch (error) {
      throw error;
    }
  }

  static async register(params: IAuthRegisterParams) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/${API_ROUTES.AUTH}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
          redirect: 'follow',
        },
      );

      const register = await response.json();

      return register;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthMutationAPI;
