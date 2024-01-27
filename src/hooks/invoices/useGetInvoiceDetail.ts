import InvoiceQueryAPI from '@/pages/api/invoice/invoice-query';
import { useQuery } from '@tanstack/react-query';

export const useGetInvoiceDetailQuery = (invoiceId: string) => {
  return useQuery({
    queryKey: ['get-invoice-detail-id-key'],
    queryFn: () => InvoiceQueryAPI.getInvoiceDetail(invoiceId),
  });
};
