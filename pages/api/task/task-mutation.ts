import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IApiTaskMutationParams } from '@/src/interfaces/api/task/task-api.interface';
import { IProjectDataParams } from '@/src/interfaces/project.interface';
import { http } from '@/src/libs/http';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class TaskMutationAPI {
  static async createTask(payload: IApiTaskMutationParams) {
    try {
      const response = await http.post(API_ROUTES.TASK, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.data;

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  static async updateTask(taskId: string, payload: IApiTaskMutationParams) {
    try {
      const response = await http.put(`${API_ROUTES.TASK}/${taskId}`, payload, {
        headers: {
          'Content-type': 'application/json',
        },
      });

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateStatusTask(id: string, status: any) {
    try {
      const response = await http.put(
        `${API_ROUTES.TASK}/status/${id}`,
        status,
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );

      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async deleteTask(taskId: string) {
    try {
      const response = await http.delete(`${API_ROUTES.TASK}/${taskId}`, {
        headers: {
          'Content-type': 'application/json',
        },
      });

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default TaskMutationAPI;
