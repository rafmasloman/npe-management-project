import ClientMutationApi from '@/pages/api/client/client-mutation.api';
import Notifications from '@/src/components/notifications/notification.component';
import { ROUTES } from '@/src/constant/routes.constant';
import { IApiClientMutationParams } from '@/src/interfaces/api/client/client-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePostClientMutation = () => {
  const queryClient = useQueryClient();

  const { push } = useRouter();
  return useMutation({
    mutationKey: ['post-client-id-key'],
    mutationFn: (payload: IApiClientMutationParams) =>
      ClientMutationApi.createClient(payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-clients-id-key'] });

      Notifications({
        title: 'Client ditambah',
        message: 'Berhasil menambah data client',
        status: 'SUCCESS',
      });

      push(`/${ROUTES.CLIENT}`);
    },
  });
};
