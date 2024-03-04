import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { IProjectDataParams } from '@/src/interfaces/project.interface';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';

class ProjectMutationApi {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.PROJECT}`;

  static async createProject(payload: FormData) {
    try {
      const response = await fetch(this.routesName, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: payload,
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      return error;
    }
  }

  static async updateProject(projectId: string, payload: FormData) {
    try {
      const response = await fetch(`${this.routesName}/${projectId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: payload,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  static async deleteProject(projectId: string) {
    try {
      const response = await fetch(`${this.routesName}/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  static async inviteMemberToProject(payload: any) {
    try {
      const response = await fetch(`${this.routesName}/inviteMember`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      return error;
    }
  }

  static async deleteMemberFromProject(payload: {
    memberId: string;
    projectId: string;
  }) {
    console.log('member : ', { memberId: payload.memberId });

    try {
      const response = await fetch(
        `${this.routesName}/removeMember/${payload.projectId}/${payload.memberId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${__getBrowserAuthCookie(TOKEN_NAME)}`,
            // body: JSON.stringify(payload.memberId),
          },
        },
      );

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      throw error;
    }
  }
}

export default ProjectMutationApi;
