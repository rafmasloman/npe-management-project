import UserMutationApi from '@/pages/api/user/user-mutation';
import { IApiCreatePostUserMutationParams } from '@/src/interfaces/api/user/user-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';
import Notifications from '@/src/components/notifications/notification.component';
import MilestoneMutationAPI from '@/pages/api/milestone/milestone-mutation';
import { IApiCreatePostMilestoneMutationParams } from '@/src/interfaces/api/milestone/milestone-api.interface';

export const usePostMilestone = (option?: {
  onSuccess: () => void;
  onError: () => void;
  onNavigate: () => void;
}) => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation({
    mutationKey: ['post-milestone-id-key'],
    mutationFn: (params: IApiCreatePostMilestoneMutationParams) =>
      MilestoneMutationAPI.createMilestone(params),
    onSuccess(data, variables, context) {
      //   queryClient.invalidateQueries({ queryKey: ['post-milestone-id-key'] });

      Notifications({
        title: 'Milestone ditambah',
        message: 'Berhasil menambah milestone',
        status: 'SUCCESS',
      });

      if (!!option?.onSuccess) {
      }
    },
    onError(error, variables, context) {
      Notifications({
        title: 'Milestone gagal ditambah',
        message: 'Gagal menambah data milestone',
        status: 'FAILED',
      });
    },
  });
};
