import ProjectMutationApi from '@/pages/api/project/project-mutation';
import TaskMutationAPI from '@/pages/api/task/task-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { ROUTES } from '@/src/constant/routes.constant';
import { IApiTaskMutationParams } from '@/src/interfaces/api/task/task-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { replace } = useRouter();

  return useMutation({
    mutationKey: ['delete-task-id-key'],
    mutationFn: (taskId: string) => TaskMutationAPI.deleteTask(taskId),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['get-project-detail-id-key'],
      });

      queryClient.invalidateQueries({
        queryKey: ['get-project-milestones-id-key'],
      });

      queryClient.invalidateQueries({
        queryKey: ['get-all-tasks-id-key'],
      });

      Notifications({
        title: 'Task Terhapus',
        message: 'Berhasil menghapus task',
        status: 'SUCCESS',
      });
      //   replace(ROUTES.ADMIN_PROJECTS);
    },
  });
};
