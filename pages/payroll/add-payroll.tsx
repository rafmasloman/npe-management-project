import MilestoneForm from '@/src/components/form/milestone/milestone.form.component';
import PayrollForm from '@/src/components/form/payroll/payroll.form.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import useRouteLoader from '@/src/utils/routes.event';
import { useRouter } from 'next/router';

const AddPayroll = () => {
  const { pathname } = useRouter();

  const isLoading = useRouteLoader();

  return (
    <MainLayout>
      {isLoading ? (
        <PageLoading />
      ) : (
        <FormLayout
          pathname={pathname}
          title="Tambah Payroll"
          pageTitle="Tambah Payroll"
        >
          <PayrollForm />
        </FormLayout>
      )}
    </MainLayout>
  );
};

export default AddPayroll;
