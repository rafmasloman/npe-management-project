import ProjectsQueryApi from '@/pages/api/project/project-query';
import { useQuery } from '@tanstack/react-query';

export const useGetProjectTeamMember = (projectId: string) => {
  return useQuery({
    queryKey: ['get-project-team-member-id-key'],
    queryFn: () => ProjectsQueryApi.getProjectTeamMember(projectId),
  });
};
