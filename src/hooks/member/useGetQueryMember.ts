import MemberQueryAPI from '@/pages/api/member/member-query';
import { useQuery } from '@tanstack/react-query';

export const useGetMemberQuery = (limit?: number) => {
  return useQuery({
    queryKey: ['get-members-id-key'],
    queryFn: () => MemberQueryAPI.getAllMembers(limit),
  });
};
