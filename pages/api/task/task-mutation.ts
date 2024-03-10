import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IApiTaskMutationParams } from '@/src/interfaces/api/task/task-api.interface';
import { IProjectDataParams } from '@/src/interfaces/project.interface';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class TaskMutationAPI {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.TASK}`;

  static async createTask(payload: IApiTaskMutationParams) {
    try {
      const response = await fetch(this.routesName, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('payload mutation : ', response);

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      throw error;
    }
  }

  static async updateTask(taskId: string, payload: IApiTaskMutationParams) {
    console.log('task id : ', taskId);

    try {
      const response = await fetch(`${this.routesName}/${taskId}`, {
        method: 'PUT',
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

  static async updateStatusTask(id: string, status: any) {
    console.log('task id : ', id);
    console.log('status : ', status);

    try {
      const response = await fetch(`${this.routesName}/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify(status),
      });

      const data = await response.json();
      console.log('data : ', data);
      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async deleteTask(taskId: string) {
    try {
      const response = await fetch(`${this.routesName}/${taskId}`, {
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

export default TaskMutationAPI;
