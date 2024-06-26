import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import {
  __getBrowserAuthCookie,
  __getSSRAuthCookie,
} from '@/src/utils/cookie.util';

export async function IAuthUserCredentialQuery() {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/${API_ROUTES.AUTH}/credential`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            __getBrowserAuthCookie(TOKEN_NAME) || __getSSRAuthCookie()
          }`,
        },
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
