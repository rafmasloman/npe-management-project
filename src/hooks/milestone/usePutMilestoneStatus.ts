import MilestoneMutationAPI from '@/pages/api/milestone/milestone-mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePutMilestoneStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['put-status-milestone-id-key'],
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      MilestoneMutationAPI.updateStatusMilestone(id, { status }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['get-project-milestones-id-key'],
      });
    },
  });
};
