import { API_ROUTES } from '@/src/constant/api-routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import {
  __getBrowserAuthCookie,
  __getSSRAuthCookie,
} from '@/src/utils/cookie.util';

class ProjectsQueryApi {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.PROJECT}`;

  static async getAllProjects(limit?: string, projectName?: string) {
    try {
      const response = await fetch(
        `${this.routesName}?limit=${limit}&projectName=${projectName}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${
              __getBrowserAuthCookie(TOKEN_NAME) || __getSSRAuthCookie()
            }`,
          },
        },
      );

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getDetailProject(projectId: string) {
    try {
      const response = await fetch(`${this.routesName}/${projectId}`, {
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
      throw error;
    }
  }

  static async getProjectTeamMember(projectId: string) {
    try {
      const response = await fetch(`${this.routesName}/teams/${projectId}`, {
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
      throw error;
    }
  }
}

export default ProjectsQueryApi;
