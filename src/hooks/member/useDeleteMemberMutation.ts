import MemberMutationApi from '@/pages/api/member/member-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMemberMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-member-id-key'],
    mutationFn: (memberId: string) => MemberMutationApi.deleteMember(memberId),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-members-id-key'] });

      Notifications({
        title: 'Member dihapus',
        message: 'Berhasil menghapus Data Member',
        status: 'SUCCESS',
      });
    },
    onError(error, variables, context) {},
  });
};
