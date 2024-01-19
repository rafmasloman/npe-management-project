import ProjectsQueryApi from '@/pages/api/project/project-query';
import { useQuery } from '@tanstack/react-query';

export const useGetProjectDetailQuery = (projectId?: string) => {
  return useQuery({
    queryKey: ['get-project-detail-id-key', projectId],
    queryFn: () => ProjectsQueryApi.getDetailProject(projectId!),
  });
};
