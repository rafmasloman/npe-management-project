import MemberQueryAPI from '@/pages/api/member/member-query';
import UserQueryApi from '@/pages/api/user/user-query';
import { QUERY_KEY } from '@/src/utils/query-key';
import { useQuery } from '@tanstack/react-query';

export const useGetMemberPM = () => {
  return useQuery({
    queryKey: [QUERY_KEY.MEMBER_PROJECT_MANAGER_USER_ROLE],
    queryFn: () => MemberQueryAPI.getMemberProjectManager(),
  });
};
