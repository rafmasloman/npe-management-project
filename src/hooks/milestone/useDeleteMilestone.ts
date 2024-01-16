import { useMutation, useQueryClient } from '@tanstack/react-query';
import Notifications from '@/src/components/notifications/notification.component';
import MilestoneMutationAPI from '@/pages/api/milestone/milestone-mutation';

export const useDeleteMilestone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-milestone-id-key'],
    mutationFn: (milestoneId: string) =>
      MilestoneMutationAPI.deleteMilestone(milestoneId),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-milestones-id-key'] });

      Notifications({
        title: 'Data berhasil dihapus',
        message: 'Berhasil menghapus data milestone',
        status: 'SUCCESS',
      });
    },
    onError: (data, variables, context) => {
      Notifications({
        title: 'Data Gagal dihapus',
        message: 'Gagal menghapus data milestone',
        status: 'FAILED',
      });
    },
  });
};
