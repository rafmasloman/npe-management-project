import InvoiceQueryAPI from '@/pages/api/invoice/invoice-query';
import { useQuery } from '@tanstack/react-query';

export const useGetAllInvoices = () => {
  return useQuery({
    queryKey: ['get-invoices-id-key'],
    queryFn: () => InvoiceQueryAPI.getAllInvoices(),
  });
};
