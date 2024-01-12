import UserQueryApi from '@/pages/api/user/user-query';
import { useQuery } from '@tanstack/react-query';

export const useGetQueryUser = () => {
  return useQuery({
    queryKey: ['user-get-all-query'],
    queryFn: () => UserQueryApi.getAllUsersQuery(),
  });
};
