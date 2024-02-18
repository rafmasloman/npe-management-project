import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import {
  __getBrowserAuthCookie,
  __getSSRAuthCookie,
} from '@/src/utils/cookie.util';

class PayrollQueryApi {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.PAYROLL}`;

  static async getAllPayroll() {
    try {
      const response = await fetch(`${this.routesName}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
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

export default PayrollQueryApi;
