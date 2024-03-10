import ProjectMutationApi from '@/pages/api/project/project-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePostMemberInvitation = () => {
  const queryClient = useQueryClient();
  const { reload } = useRouter();

  return useMutation({
    mutationKey: ['invite-member-id-key'],
    mutationFn: (payload: any) =>
      ProjectMutationApi.inviteMemberToProject(payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['get-project-detail-id-key'],
      });

      Notifications({
        message: 'Berhasil mengundang member',
        status: 'SUCCESS',
        title: 'Berhasil',
      });
    },
  });
};
