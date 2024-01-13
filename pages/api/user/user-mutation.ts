import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IApiBaseResponse } from '@/src/interfaces/base-response.interface';
import {
  IApiCreatePostUserMutationParams,
  IApiCreatePostUserMutationResponse,
  IApiGetUserQueryResponse,
} from '@/src/interfaces/api/user/user-api.interface';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class UserMutationApi {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.USER}`;

  static async createPostUserMutation(
    params: IApiCreatePostUserMutationParams,
  ): Promise<IApiBaseResponse<IApiCreatePostUserMutationResponse>> {
    try {
      const response = await fetch(this.routesName, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify(params),
      });

      const data: IApiBaseResponse<IApiCreatePostUserMutationResponse> =
        await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updatePutUserMutation(
    userId: string,
    params: IApiCreatePostUserMutationParams,
  ): Promise<IApiBaseResponse<IApiCreatePostUserMutationResponse>> {
    try {
      const response = await fetch(`${this.routesName}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify(params),
      });

      const data: IApiBaseResponse<IApiCreatePostUserMutationResponse> =
        await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserMutation(userId: string) {
    try {
      const response = await fetch(`${this.routesName}/${userId}`, {
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

export default UserMutationApi;
