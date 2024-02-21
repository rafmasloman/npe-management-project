import UserQueryApi from '@/pages/api/user/user-query';
import { useQuery } from '@tanstack/react-query';

export const useGetUserRoleQuery = () => {
  return useQuery({
    queryKey: ['user-get-all-role-staff-query'],
    queryFn: () => UserQueryApi.getUserQueryStaff(),
  });
};
