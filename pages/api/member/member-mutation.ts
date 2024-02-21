import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class MemberMutationApi {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.MEMBER}`;

  static async createMember(payload: FormData) {
    try {
      const response = await fetch(`${this.routesName}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: payload,
      });

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMember(memberId: string) {
    try {
      const response = await fetch(`${this.routesName}/${memberId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default MemberMutationApi;
