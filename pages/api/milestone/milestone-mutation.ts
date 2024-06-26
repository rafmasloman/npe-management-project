import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IProjectDataParams } from '@/src/interfaces/project.interface';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

interface IMilestonePayload {
  milestoneName: string;
  projectId: string;
  startedDate: string;
  endDate: string;
}

class MilestoneMutationAPI {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.MILESTONE}`;

  static async createMilestone(payload: IMilestonePayload) {
    try {
      const response = await fetch(this.routesName, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('create : ', response);

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async updateMilestone(
    milestoneId: string,
    payload: IMilestonePayload,
  ) {
    try {
      const response = await fetch(`${this.routesName}/${milestoneId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async updateStatusMilestone(
    milestoneId: string,
    payload: { status: string },
  ) {
    try {
      const response = await fetch(`${this.routesName}/status/${milestoneId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async deleteMilestone(milestoneId: string) {
    try {
      const response = await fetch(`${this.routesName}/${milestoneId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
      });

      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

export default MilestoneMutationAPI;
