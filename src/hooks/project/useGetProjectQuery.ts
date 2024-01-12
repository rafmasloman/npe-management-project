import ProjectsQueryApi from '@/pages/api/project/project-query';
import { useQuery } from '@tanstack/react-query';

export const useGetProjectQuery = () => {
  return useQuery({
    queryKey: ['get-projects-id-key'],
    queryFn: () => ProjectsQueryApi.getAllProjects(),
  });
};
