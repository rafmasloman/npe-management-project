import UserForm from '@/src/components/form/client.form.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import { COLORS } from '@/src/constant/colors.constant';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import useRouteLoader from '@/src/utils/routes.event';
import { Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { Suspense } from 'react';

const AddUser = () => {
  const { pathname } = useRouter();

  return (
    <MainLayout>
      <Suspense fallback={<Loader size={100} color={COLORS.PRIMARY} />}>
        <FormLayout
          pathname={pathname}
          title="Add User"
          pageTitle="Tambah User"
        >
          <UserForm />
        </FormLayout>
      </Suspense>
    </MainLayout>
  );
};

export default AddUser;
