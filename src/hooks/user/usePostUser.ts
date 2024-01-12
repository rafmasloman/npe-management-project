import UserMutationApi from '@/pages/api/user/user-mutation';
import { IApiCreatePostUserMutationParams } from '@/src/interfaces/user/user-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';
import Notifications from '@/src/components/notifications/notification.component';

export const usePostUser = (option?: {
  onSuccess: () => void;
  onError: () => void;
  onNavigate: () => void;
}) => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation({
    mutationKey: ['post-create-user-id-key'],
    mutationFn: (params: IApiCreatePostUserMutationParams) =>
      UserMutationApi.createPostUserMutation(params),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['user-get-all-query'] });

      Notifications({
        title: 'User ditambah',
        message: 'Berhasil menambah data user',
        status: 'SUCCESS',
      });

      replace(ROUTES.ADMIN_USER);

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
