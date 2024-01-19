import UserQueryApi from '@/pages/api/user/user-query';
import { useQuery } from '@tanstack/react-query';

export const useGetQueryUserProjects = (userId: string) => {
  return useQuery({
    queryKey: ['user-get-project-id-query-key', userId],
    queryFn: () => UserQueryApi.getUserProjects(userId),
    refetchOnWindowFocus: true,
  });
};
