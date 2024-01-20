import { useQuery, useQueryClient } from '@tanstack/react-query';
import MilestoneQueryAPI from '@/pages/api/milestone/milestone-query';

export const useGetMilestonesByProject = (projectId: string) => {
  return useQuery({
    queryKey: ['get-project-milestones-id-key', projectId],
    queryFn: () => MilestoneQueryAPI.getMilestonesByProject(projectId),
  });
};
