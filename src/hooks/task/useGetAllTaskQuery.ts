import TaskQueryAPI from '@/pages/api/task/task-query';
import { useQuery } from '@tanstack/react-query';

export const useGetAllTaskQuery = () => {
  return useQuery({
    queryKey: ['get-all-tasks-id-key'],
    queryFn: () => TaskQueryAPI.getAllTask(),
  });
};
