import PayrollMutationApi from '@/pages/api/payroll/payroll-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { ROUTES } from '@/src/constant/routes.constant';
import { ICreatePayrollRequestParams } from '@/src/interfaces/api/payroll/payroll-api.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePostPayroll = () => {
  const queryClient = useQueryClient();

  const { push } = useRouter();

  return useMutation({
    mutationKey: ['post-payroll-id-key'],
    mutationFn: (payload: ICreatePayrollRequestParams) =>
      PayrollMutationApi.createPayroll(payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-payrolls-id-key'] });
      Notifications({
        title: 'Payroll ditambah',
        message: 'Berhasil menambah data payroll',
        status: 'SUCCESS',
      });
      push(ROUTES.PAYROLL);
    },
    onError(error, variables, context) {},
  });
};
