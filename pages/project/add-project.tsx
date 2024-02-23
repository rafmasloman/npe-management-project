import ProjectForm from '@/src/components/form/project/project.form.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';
import useRouteLoader from '@/src/utils/routes.event';
import { useRouter } from 'next/router';

const AddProject = () => {
  const { pathname } = useRouter();

  const isLoading = useRouteLoader();

  const token = __getBrowserAuthCookie('token');

  return (
    <MainLayout>
      {isLoading ? (
        <PageLoading />
      ) : (
        <FormLayout
          pathname={pathname}
          title="Tambah Project"
          pageTitle="Tambah Project"
          anchorData={[
            {
              id: 1,
              text: 'Project',
              href: '/project',
              isActiveText: '/project',
            },
            {
              id: 2,
              text: 'Tambah Project',
              href: '/add-project',
              isActiveText: '/add-project',
            },
          ]}
        >
          <ProjectForm />
        </FormLayout>
      )}
    </MainLayout>
  );
};

export default AddProject;
