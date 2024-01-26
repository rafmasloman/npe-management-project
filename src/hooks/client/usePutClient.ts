import ClientMutationApi from '@/pages/api/client/client-mutation.api';
import Notifications from '@/src/components/notifications/notification.component';
import { ROUTES } from '@/src/constant/routes.constant';
import { IApiClientMutationParams } from '@/src/interfaces/api/client/client-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface IClientMutationUpdateParams {
  clientId: string;
  payload: IApiClientMutationParams;
}

export const usePutClientMutation = () => {
  const queryClient = useQueryClient();

  const { push } = useRouter();
  return useMutation({
    mutationKey: ['put-client-id-key'],
    mutationFn: ({ clientId, payload }: IClientMutationUpdateParams) =>
      ClientMutationApi.updateClient(clientId, payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-clients-id-key'] });

      Notifications({
        title: 'Client diubah',
        message: 'Berhasil mengubah data client',
        status: 'SUCCESS',
      });

      push(`/${ROUTES.CLIENT}`);
    },

    onError(error, variables, context) {
      Notifications({
        title: 'Client gagal diubah',
        message: 'Gagal mengubah data client',
        status: 'FAILED',
      });
    },
  });
};
