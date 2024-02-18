import UserMutationApi from '@/pages/api/user/user-mutation';
import { IApiCreatePostUserMutationParams } from '@/src/interfaces/api/user/user-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';
import Notifications from '@/src/components/notifications/notification.component';

export const useUpdateUserMutation = (option?: {
  onSuccess: () => void;
  onError: () => void;
  onNavigate: () => void;
}) => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation({
    mutationKey: ['post-update-user-id-key'],
    mutationFn: ({
      userId,
      params,
    }: {
      userId: string;
      params: IApiCreatePostUserMutationParams;
    }) => UserMutationApi.updatePutUserMutation(userId, params),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['user-get-all-query'] });

      Notifications({
        title: 'User diubah',
        message: 'Berhasil mengubah data user',
        status: 'SUCCESS',
      });

      replace(ROUTES.USER);

      if (!!option?.onSuccess) {
      }
    },
    onError(error, variables, context) {
      Notifications({
        title: 'User gagal ditambah',
        message: 'Gagal menambah data user',
        status: 'FAILED',
      });
    },
  });
};
