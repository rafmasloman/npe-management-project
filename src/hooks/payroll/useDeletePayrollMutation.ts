import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import Notifications from '@/src/components/notifications/notification.component';
import PayrollMutationApi from '@/pages/api/payroll/payroll-mutation';

export const useDeletePayroll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-payroll-id-key'],
    mutationFn: (payrollId: string) =>
      PayrollMutationApi.deletePayroll(payrollId),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-payrolls-id-key'] });

      Notifications({
        title: 'Data berhasil dihapus',
        message: 'Berhasil menghapus data payroll',
        status: 'SUCCESS',
      });
    },
    onError: (data, variables, context) => {
      Notifications({
        title: 'Data Gagal dihapus',
        message: 'Gagal menghapus data payroll',
        status: 'FAILED',
      });
    },
  });
};
