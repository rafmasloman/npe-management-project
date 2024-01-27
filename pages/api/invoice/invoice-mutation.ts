import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IApiInvoiceMutationParams } from '@/src/interfaces/api/invoice/invoice-api.interface';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class InvoiceMutationAPI {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.INVOICE}`;

  static async createInvoice(payload: IApiInvoiceMutationParams) {
    try {
      const response = await fetch(this.routesName, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  static async updateInvoice(
    invoiceId: string,
    payload: IApiInvoiceMutationParams,
  ) {
    console.log('payload : ', payload);

    try {
      const response = await fetch(`${this.routesName}/${invoiceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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

  static async deleteInvoice(invoiceId: string) {
    try {
      const response = await fetch(`${this.routesName}/${invoiceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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

export default InvoiceMutationAPI;
