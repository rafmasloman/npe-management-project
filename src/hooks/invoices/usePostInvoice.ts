import InvoiceMutationAPI from '@/pages/api/invoice/invoice-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { ROUTES } from '@/src/constant/routes.constant';
import { IApiInvoiceMutationParams } from '@/src/interfaces/api/invoice/invoice-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePostInvoiceMutation = () => {
  const queryClient = useQueryClient();

  const { push } = useRouter();
  return useMutation({
    mutationKey: ['post-invoice-id-key'],
    mutationFn: (payload: IApiInvoiceMutationParams) =>
      InvoiceMutationAPI.createInvoice(payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-invoices-id-key'] });

      Notifications({
        title: 'Invoice ditambah',
        message: 'Berhasil menambah data invoice',
        status: 'SUCCESS',
      });

      push(`/${ROUTES.INVOICES}`);
    },
    onError(error, variables, context) {
      Notifications({
        title: 'Invoice gagal ditambah',
        message: 'Gagal menambah data invoice',
        status: 'FAILED',
      });
    },
  });
};
