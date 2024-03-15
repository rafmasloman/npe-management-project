import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IProjectDataParams } from '@/src/interfaces/project.interface';
import { http } from '@/src/libs/http';
import {
  __getBrowserAuthCookie,
  __getSSRAuthCookie,
} from '@/src/utils/cookie.util';

interface IMilestonePayload {
  milestoneName: string;
  projectId: string;
  startedDate: string;
  endDate: string;
}

class MilestoneQueryAPI {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.MILESTONE}`;

  static async getAllMilestone() {
    try {
      const response = await http.get(API_ROUTES.MILESTONE, {
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

  static async getDetailMilestone(milestoneId: string) {
    try {
      const response = await fetch(`${this.routesName}/${milestoneId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${
            __getBrowserAuthCookie(TOKEN_NAME) || __getSSRAuthCookie()
          }`,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async getMilestonesByProject(projectId: string) {
    try {
      const response = await fetch(`${this.routesName}/project/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${
            __getBrowserAuthCookie(TOKEN_NAME) || __getSSRAuthCookie()
          }`,
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

export default MilestoneQueryAPI;
