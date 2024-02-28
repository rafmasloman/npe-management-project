import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import {
  __getBrowserAuthCookie,
  __getSSRAuthCookie,
} from '@/src/utils/cookie.util';

class ProfileQueryApi {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.PROFILE}`;

  static async getUserProfile(userId: string) {
    try {
      const response = await fetch(`${this.routesName}/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${
            __getBrowserAuthCookie(TOKEN_NAME) || __getSSRAuthCookie()
          }`,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileQueryApi;
