import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IPostCommentMutationParams } from '@/src/interfaces/comment.interfaces';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class CommentMutationAPI {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.COMMENT}`;

  static async sendCommentMessage(payload: IPostCommentMutationParams) {
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
}

export default CommentMutationAPI;
