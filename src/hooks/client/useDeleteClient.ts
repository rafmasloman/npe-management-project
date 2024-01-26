import UserMutationApi from '@/pages/api/user/user-mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { COLORS } from '@/src/constant/colors.constant';
import Notifications from '@/src/components/notifications/notification.component';
import ProjectMutationApi from '@/pages/api/project/project-mutation';
import ClientMutationApi from '@/pages/api/client/client-mutation.api';

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-client-id-key'],
    mutationFn: (clientId: string) => ClientMutationApi.deleteClient(clientId),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-clients-id-key'] });

      Notifications({
        title: 'Data berhasil dihapus',
        message: 'Berhasil menghapus data client',
        status: 'SUCCESS',
      });
    },
    onError: (data, variables, context) => {
      Notifications({
        title: 'Data Gagal dihapus',
        message: 'Gagal menghapus data client',
        status: 'FAILED',
      });
    },
  });
};
