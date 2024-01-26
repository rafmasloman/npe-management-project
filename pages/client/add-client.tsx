import ClientForm from '@/src/components/form/client/client.form.component';
import ProjectForm from '@/src/components/form/project/project.form.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';
import useRouteLoader from '@/src/utils/routes.event';
import { useRouter } from 'next/router';

const Add = () => {
  const { pathname } = useRouter();

  const isLoading = useRouteLoader();

  const token = __getBrowserAuthCookie('token');

  console.log('token : ', token);

  return (
    <MainLayout>
      {isLoading ? (
        <PageLoading />
      ) : (
        <FormLayout pathname={pathname} title="Add " pageTitle="Tambah ">
          <ClientForm />
        </FormLayout>
      )}
    </MainLayout>
  );
};

export default Add;
