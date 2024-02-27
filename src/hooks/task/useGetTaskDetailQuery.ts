import TaskQueryAPI from '@/pages/api/task/task-query';
import { useQuery } from '@tanstack/react-query';

export const useGetTaskDetailQuery = (taskId: string) => {
  return useQuery({
    queryKey: ['get-task-detail-id-key', taskId],
    queryFn: () => TaskQueryAPI.getTaskDetail(Number(taskId)),
  });
};
