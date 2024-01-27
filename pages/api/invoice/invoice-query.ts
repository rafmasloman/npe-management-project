import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import {
  __getBrowserAuthCookie,
  __getSSRAuthCookie,
} from '@/src/utils/cookie.util';

class InvoiceQueryAPI {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.INVOICE}`;

  static async getAllInvoices(
    limit?: number,
    title?: string,
    clientName?: string,
  ) {
    try {
      const response = await fetch(
        `${this.routesName}?limit=${!limit ? '' : limit}&title=${
          !title ? '' : title
        }&clientName=${!clientName ? '' : clientName}`,
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
      throw error;
    }
  }

  static async getInvoiceDetail(invoiceId: string) {
    try {
      const response = await fetch(`${this.routesName}/${invoiceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

export default InvoiceQueryAPI;
