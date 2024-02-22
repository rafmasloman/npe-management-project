import UserForm from '@/src/components/form/user/user-form.component';
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

  const isLoading = useRouteLoader();

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <MainLayout>
      <FormLayout
        pathname={pathname}
        title="Tambah User"
        pageTitle="Tambah User"
        anchorData={[
          {
            id: 1,
            text: 'User Management',
            href: '/admin/user-management',
            isActiveText: '/user-management',
          },
          {
            id: 2,
            text: 'Tambah User',
            href: '/admin/user-management/add-user',
            isActiveText: '/add-user',
          },
        ]}
      >
        <UserForm />
      </FormLayout>
    </MainLayout>
  );
};

export default AddUser;
