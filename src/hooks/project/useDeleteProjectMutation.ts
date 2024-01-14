import UserMutationApi from '@/pages/api/user/user-mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { COLORS } from '@/src/constant/colors.constant';
import Notifications from '@/src/components/notifications/notification.component';
import ProjectMutationApi from '@/pages/api/project/project-mutation';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-project-id-key'],
    mutationFn: (projectId: string) =>
      ProjectMutationApi.deleteProject(projectId),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-projects-id-key'] });

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
