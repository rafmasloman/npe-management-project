import ProjectMutationApi from '@/pages/api/project/project-mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMemberFromProject = (options?: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-member-from-project-id-key'],
    mutationFn: (payload: { memberId: string; projectId: string }) =>
      ProjectMutationApi.deleteMemberFromProject(payload),
    onSuccess(data, variables, context) {
      if (options?.onSuccess) {
        options.onSuccess();
      }

      queryClient.invalidateQueries({
        queryKey: ['get-project-detail-id-key'],
      });
    },
    onError(error, variables, context) {
      if (options?.onError) {
        options.onError;
        console.log('error : ', error);
      }
      console.log('error : ', error);
    },
  });
};
