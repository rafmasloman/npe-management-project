import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { IAuthLoginParams } from '@/src/interfaces/auth.interface';

export async function AuthLoginApiMutation(params: IAuthLoginParams) {
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
