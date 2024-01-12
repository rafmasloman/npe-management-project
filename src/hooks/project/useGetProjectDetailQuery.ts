import ProjectsQueryApi from '@/pages/api/project/project-query';
import { useQuery } from '@tanstack/react-query';

export const useGetProjectDetailQuery = (projectId?: string) => {
  return useQuery({
    queryKey: ['get-projects-id-key'],
    queryFn: () => ProjectsQueryApi.getDetailProject(projectId!),
  });
};
