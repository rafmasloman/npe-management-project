import MemberMutationApi from '@/pages/api/member/member-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePostMemberMutation = () => {
  const queryClient = useQueryClient();

  const { push } = useRouter();
  return useMutation({
    mutationKey: ['post-member-id-key'],
    mutationFn: (payload: FormData) => MemberMutationApi.createMember(payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-members-id-key'] });

      Notifications({
        message: 'Berhasil menambah Member',
        title: 'Member ditambah',
        status: 'SUCCESS',
      });

      if (!!data) {
        push('/member');
      }
    },
  });
};
