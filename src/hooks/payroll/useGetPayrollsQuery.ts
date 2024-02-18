import PayrollQueryApi from '@/pages/api/payroll/payroll-query';
import ProjectsQueryApi from '@/pages/api/project/project-query';
import { useQuery } from '@tanstack/react-query';

export const useGetPayrollQuery = () => {
  return useQuery({
    queryKey: ['get-payrolls-id-key'],
    queryFn: () => PayrollQueryApi.getAllPayroll(),
  });
};
