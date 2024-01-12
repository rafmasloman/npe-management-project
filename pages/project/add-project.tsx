import ProjectForm from '@/src/components/form/project.form.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import useRouteLoader from '@/src/utils/routes.event';
import { useRouter } from 'next/router';

const AddProject = () => {
  const { pathname } = useRouter();

  const isLoading = useRouteLoader();

  return (
    <MainLayout>
      {isLoading ? (
        <PageLoading />
      ) : (
        <FormLayout
          pathname={pathname}
          title="Add Project"
          pageTitle="Tambah Project"
        >
          <ProjectForm   />
        </FormLayout>
      )}
    </MainLayout>
  );
};

export default AddProject;
