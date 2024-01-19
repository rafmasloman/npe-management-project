import ProjectMutationApi from '@/pages/api/project/project-mutation';
import TaskMutationAPI from '@/pages/api/task/task-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { ROUTES } from '@/src/constant/routes.constant';
import { IApiTaskMutationParams } from '@/src/interfaces/api/task/task-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePostTask = () => {
  const queryClient = useQueryClient();

  const { replace } = useRouter();

  return useMutation({
    mutationKey: ['post-task-id-key'],
    mutationFn: (payload: IApiTaskMutationParams) =>
      TaskMutationAPI.createTask(payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['get-project-detail-id-key'],
      });
      Notifications({
        title: 'Task Ditambah',
        message: 'Berhasil menambah task',
        status: 'SUCCESS',
      });
      //   replace(ROUTES.ADMIN_PROJECTS);
    },
  });
};
