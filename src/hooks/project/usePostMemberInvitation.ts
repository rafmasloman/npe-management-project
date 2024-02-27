import ProjectMutationApi from '@/pages/api/project/project-mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostMemberInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['invite-member-id-key'],
    mutationFn: (payload: any) =>
      ProjectMutationApi.inviteMemberToProject(payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['get-project-detail-id-key'],
      });
    },
  });
};
