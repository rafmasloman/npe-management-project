import UserMutationApi from '@/pages/api/user/user-mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { COLORS } from '@/src/constant/colors.constant';
import Notifications from '@/src/components/notifications/notification.component';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-user-id-key'],
    mutationFn: (userId: string) => UserMutationApi.deleteUserMutation(userId),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      Notifications({
        title: 'Data berhasil dihapus',
        message: 'Berhasil menghapus data user',
        status: 'SUCCESS',
      });
    },
    onError: (data, variables, context) => {
      Notifications({
        title: 'Data Gagal dihapus',
        message: 'Gagal menghapus data user',
        status: 'FAILED',
      });
    },
  });
};
