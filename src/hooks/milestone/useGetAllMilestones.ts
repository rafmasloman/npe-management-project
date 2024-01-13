import UserMutationApi from '@/pages/api/user/user-mutation';
import { IApiCreatePostUserMutationParams } from '@/src/interfaces/api/user/user-api.interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';
import Notifications from '@/src/components/notifications/notification.component';
import MilestoneMutationAPI from '@/pages/api/milestone/milestone-mutation';
import { IApiCreatePostMilestoneMutationParams } from '@/src/interfaces/api/milestone/milestone-api.interface';

export const useGetAllMilestone = () => {
  return useQuery({
    queryKey: ['get-milestones-id-key'],
    queryFn: () => MilestoneMutationAPI.getAllMilestone(),
  });
};
