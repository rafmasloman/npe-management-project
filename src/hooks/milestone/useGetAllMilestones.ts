import { useQuery, useQueryClient } from '@tanstack/react-query';
import MilestoneQueryAPI from '@/pages/api/milestone/milestone-query';

export const useGetAllMilestone = () => {
  return useQuery({
    queryKey: ['get-milestones-id-key'],
    queryFn: () => MilestoneQueryAPI.getAllMilestone(),
  });
};
