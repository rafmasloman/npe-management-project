import ProjectForm from '@/src/components/form/project/project.form.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import {
  __getBrowserAuthCookie,
  __setSSRAuthCookie,
} from '@/src/utils/cookie.util';
import useRouteLoader from '@/src/utils/routes.event';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import cookie from 'cookie';
import ProjectsQueryApi from '@/pages/api/project/project-query';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { params, req } = ctx;

  const projectId = params?.id;

  const cookieToken = cookie.parse(req.headers.cookie!) as any;

  __setSSRAuthCookie(cookieToken?.token);

  const projectDetail = await ProjectsQueryApi.getDetailProject(
    projectId as string,
  );

  return { props: { projectDetail } };
}

const EditProject = ({ projectDetail }: any) => {
  const { pathname } = useRouter();

  const isLoading = useRouteLoader();

  const token = __getBrowserAuthCookie('token');

  const {
    projectName,
    clientId,
    platform,
    startedDate,
    endDate,
    description,
    projectIcon,
    member,
    price,
  } = projectDetail.data?.project;

  console.log('member pro : ', member);

  return (
    <MainLayout>
      {isLoading ? (
        <PageLoading />
      ) : (
        <FormLayout
          pathname={pathname}
          title="Edit Project"
          pageTitle="Edit Project"
          anchorData={[
            {
              id: 1,
              text: 'Project',
              href: '/project',
              isActiveText: '/project',
            },
            {
              id: 2,
              text: 'Edit Project',
              href: '/edit-project',
              isActiveText: '/edit-project',
            },
          ]}
        >
          <ProjectForm
            initValue={{
              projectName,
              client: clientId,
              platform,
              description,
              startedDate: new Date(startedDate),
              endDate: new Date(endDate),
              projectIcon,
              member,
              price,
            }}
          />
        </FormLayout>
      )}
    </MainLayout>
  );
};

export default EditProject;
