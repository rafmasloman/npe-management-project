import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class CommentQueryAPI {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.COMMENT}`;

  static async getAllComments() {
    try {
      const response = await fetch(`${this.routesName}`, {
        method: 'GET',
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

  static async getCommentByTask(taskId: number) {
    console.log('task Id : ', taskId);

    try {
      const response = await fetch(`${this.routesName}/task?taskId=${taskId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log('body : ', error);

      throw error;
    }
  }

  static async getCommentById(commentId: number) {
    try {
      const response = await fetch(`${this.routesName}/member`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify({ id: commentId }),
        redirect: 'follow',
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log('body : ', error);

      throw error;
    }
  }
}

export default CommentQueryAPI;
