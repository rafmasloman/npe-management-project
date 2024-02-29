import ProjectMutationApi from '@/pages/api/project/project-mutation';
import TaskMutationAPI from '@/pages/api/task/task-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { ROUTES } from '@/src/constant/routes.constant';
import { IApiTaskMutationParams } from '@/src/interfaces/api/task/task-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePutStatusTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['put-status-task-id-key'],
    mutationFn: ({ id, status }: any) =>
      TaskMutationAPI.updateStatusTask(id, { status }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['get-project-detail-id-key'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-project-milestones-id-key'],
      });
    },
  });
};
