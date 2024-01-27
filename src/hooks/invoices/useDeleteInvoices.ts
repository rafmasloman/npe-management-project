import UserMutationApi from '@/pages/api/user/user-mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { COLORS } from '@/src/constant/colors.constant';
import Notifications from '@/src/components/notifications/notification.component';
import ProjectMutationApi from '@/pages/api/project/project-mutation';
import InvoiceMutationAPI from '@/pages/api/invoice/invoice-mutation';

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-invoice-id-key'],
    mutationFn: (invoiceId: string) =>
      InvoiceMutationAPI.deleteInvoice(invoiceId),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-invoices-id-key'] });

      Notifications({
        title: 'Data invoice berhasil dihapus',
        message: 'Berhasil menghapus data invoice',
        status: 'SUCCESS',
      });
    },
    onError: (data, variables, context) => {
      Notifications({
        title: 'Data Gagal dihapus',
        message: 'Gagal menghapus data invoice',
        status: 'FAILED',
      });
    },
  });
};
