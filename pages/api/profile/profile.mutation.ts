import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IUpdateProfilePayload } from '@/src/interfaces/api/profile/profile.interface';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class ProfileMutation {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.PROFILE}`;

  static async updateProfile(userId: string, payload: IUpdateProfilePayload) {
    try {
      const response = await fetch(`${this.routesName}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileMutation;
