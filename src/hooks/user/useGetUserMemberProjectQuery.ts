import UserQueryApi from '@/pages/api/user/user-query';
import { useQuery } from '@tanstack/react-query';

export const useGetQueryUserMemberProjects = (userId: string) => {
  return useQuery({
    queryKey: ['user-member-get-projects-id-query-key', userId],
    queryFn: () => UserQueryApi.getUserMemberProjects(userId),
    refetchOnWindowFocus: true,
  });
};
