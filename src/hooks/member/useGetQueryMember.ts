import MemberQueryAPI from '@/pages/api/member/member-query';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';
import { useQuery } from '@tanstack/react-query';

export const useGetMemberQuery = (limit?: number) => {
  const token = __getBrowserAuthCookie(TOKEN_NAME);
  return useQuery({
    queryKey: ['get-members-id-key', token],
    queryFn: () => MemberQueryAPI.getAllMembers(limit),
  });
};
