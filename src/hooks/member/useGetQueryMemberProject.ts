import MemberQueryAPI from '@/pages/api/member/member-query';
import { useQuery } from '@tanstack/react-query';

export const useGetMemberProjectQuery = (userId: string) => {
  return useQuery({
    queryKey: ['get-member-projects-id-key', userId],
    queryFn: () => MemberQueryAPI.getAllMemberProject(userId),
  });
};
