import TaskMutationAPI from '@/pages/api/task/task-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { IApiTaskMutationParams } from '@/src/interfaces/api/task/task-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-task-id-key'],
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: IApiTaskMutationParams;
    }) => TaskMutationAPI.updateTask(taskId, payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['get-project-detail-id-key'],
      });

      Notifications({
        title: 'Task Diubah',
        message: 'Berhasil mengubah task',
        status: 'SUCCESS',
      });
    },
    onError(error, variables, context) {},
  });
};
