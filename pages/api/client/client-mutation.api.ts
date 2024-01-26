import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IApiClientMutationParams } from '@/src/interfaces/api/client/client-api.interface';
import { IProjectDataParams } from '@/src/interfaces/project.interface';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class ClientMutationApi {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.CLIENT}`;

  static async createClient(payload: IApiClientMutationParams) {
    try {
      const response = await fetch(this.routesName, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify(payload),
      });

      console.log(response);

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      throw error;
    }
  }

  static async updateClient(
    clientId: string,
    payload: IApiClientMutationParams,
  ) {
    try {
      const response = await fetch(`${this.routesName}/${clientId}`, {
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
      console.log('error : ', error);

      throw error;
    }
  }

  static async deleteClient(clientId: string) {
    try {
      console.log('client id : ', clientId);
      const response = await fetch(`${this.routesName}/${clientId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

export default ClientMutationApi;
