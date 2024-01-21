import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IApiBaseResponse } from '@/src/interfaces/base-response.interface';
import { IApiGetAllRoleQueryResponse } from '@/src/interfaces/api/role/role-api.interface';
import { IApiGetUserQueryResponse } from '@/src/interfaces/api/user/user-api.interface';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class UserQueryApi {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.USER}`;

  static async getAllUsersQuery() {
    try {
      const response = await fetch(this.routesName, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
      });

      console.log(response);

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async getUserQueryById(
    userId: string,
  ): Promise<IApiBaseResponse<IApiGetUserQueryResponse>> {
    try {
      const response = await fetch(`${this.routesName}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
      });

      const data: IApiBaseResponse<IApiGetUserQueryResponse> =
        await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllRoleQuery(): Promise<
    IApiBaseResponse<IApiGetAllRoleQueryResponse[]>
  > {
    try {
      const response = await fetch(`${this.routesName}/roles`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
      });

      const data: IApiBaseResponse<IApiGetAllRoleQueryResponse[]> =
        await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserProjects(userId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/project/member/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
          },
        },
      );

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserQueryApi;
