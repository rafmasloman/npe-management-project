import InvoiceMutationAPI from '@/pages/api/invoice/invoice-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { ROUTES } from '@/src/constant/routes.constant';
import { IApiInvoiceMutationParams } from '@/src/interfaces/api/invoice/invoice-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface IInvoiceUpdateMutationTypes {
  invoiceId: string;
  payload: IApiInvoiceMutationParams;
}

export const usePutInvoiceMutation = () => {
  const queryClient = useQueryClient();

  const { push } = useRouter();
  return useMutation({
    mutationKey: ['put-invoice-id-key'],
    mutationFn: ({ invoiceId, payload }: IInvoiceUpdateMutationTypes) =>
      InvoiceMutationAPI.updateInvoice(invoiceId, payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-invoices-id-key'] });

      Notifications({
        title: 'Invoice diubah',
        message: 'Berhasil mengubah data invoice',
        status: 'SUCCESS',
      });

      push(`/${ROUTES.INVOICES}`);
    },
    onError(error, variables, context) {
      Notifications({
        title: 'Invoice gagal diubah',
        message: 'Gagal mengubah data invoice',
        status: 'FAILED',
      });
    },
  });
};
