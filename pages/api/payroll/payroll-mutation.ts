import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { ICreatePayrollRequestParams } from '@/src/interfaces/api/payroll/payroll-api.interface';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class PayrollMutationApi {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.PAYROLL}`;

  static async createPayroll(payload: ICreatePayrollRequestParams) {
    try {
      const response = await fetch(`${this.routesName}`, {
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

  static async deletePayroll(payrollId: string) {
    try {
      const response = await fetch(`${this.routesName}/${Number(payrollId)}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
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

export default PayrollMutationApi;
