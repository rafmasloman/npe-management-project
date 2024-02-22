import ClientForm from '@/src/components/form/client/client.form.component';
import InvoiceForm from '@/src/components/form/invoice/invoice.form';
import ProjectForm from '@/src/components/form/project/project.form.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';
import useRouteLoader from '@/src/utils/routes.event';
import { useRouter } from 'next/router';

const AddInvoicePage = () => {
  const { pathname } = useRouter();

  const isLoading = useRouteLoader();

  if (isLoading) {
    <PageLoading />;
  }

  return (
    <MainLayout>
      <FormLayout
        pathname={pathname}
        title="Halaman Tambah Invoice"
        pageTitle="Tambah Invoice"
      >
        <InvoiceForm />
      </FormLayout>
    </MainLayout>
  );
};

export default AddInvoicePage;
