import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { http } from '@/src/libs/http';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class TaskQueryAPI {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.TASK}`;

  static async getAllTask() {
    try {
      const response = await http.get(API_ROUTES.TASK, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      return data;
    } catch (error: any) {
      console.log(error);
    }
  }

  static async getTaskDetail(taskId: number) {
    try {
      const response = await fetch(`${this.routesName}/${taskId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      throw error;
    }
  }
}

export default TaskQueryAPI;
