import { platformService } from '@/pages/api/dummy/platform-service.dummy.api';
import { projects } from '@/pages/api/dummy/project.dummy.api';
import { tasks } from '@/pages/api/dummy/task.dummy.api';
import SEO from '@/src/components/SEO/seo.component';
import ButtonNavigate from '@/src/components/button/button-link.component';
import ProjectCard from '@/src/components/card/project-card.component';
import HeaderPage from '@/src/components/header/header-page.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import { COLORS } from '@/src/constant/colors.constant';
import { useGetProjectQuery } from '@/src/hooks/project/useGetProjectQuery';
import { IProjectCardProps } from '@/src/interfaces/project.interface';
import MainLayout from '@/src/layouts/main.layout';
import ProjectLayout from '@/src/layouts/project.layout';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import useRouteLoader from '@/src/utils/routes.event';
import { Button, Loader, SimpleGrid, Space, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Suspense, useContext, useEffect, useState } from 'react';
import DownloadFileAPI from '../api/file/file-query';
import { GetServerSidePropsContext } from 'next';
import { __setSSRAuthCookie } from '@/src/utils/cookie.util';
import ProjectsQueryApi from '../api/project/project-query';

import cookie from 'cookie';
import { UserContext } from '@/src/context/user-credential.context';
import { useGetMemberProjectQuery } from '@/src/hooks/member/useGetQueryMemberProject';
import { useGetQueryUserProjects } from '@/src/hooks/user/useGetUserProjectQuery';
import { useGetQueryUserMemberProjects } from '@/src/hooks/user/useGetUserMemberProjectQuery';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req, query } = ctx;

  const cookieToken = cookie.parse(req.headers.cookie!) as any;

  __setSSRAuthCookie(cookieToken?.token!);

  const projects = await ProjectsQueryApi.getAllProjects(
    undefined,
    (query.q as string) || '',
  );

  return { props: { projects } };
}

const ProjectAdmin = () => {
  const { pathname } = useRouter();
  const user = useContext(UserContext);
  const largeScreen = useMediaQuery('(min-width: 60em)');
  const [iconFilename, setIconFilename] = useState('');

  const [projects, setProjects] = useState([]);

  const {
    data: getProjects,
    isSuccess,
    isLoading,
    refetch,
  } = useGetProjectQuery(undefined, '');

  const { data: getMemberProjects } = useGetQueryUserMemberProjects(
    user?.user?.id!,
  );

  useEffect(() => {
    user?.user?.role === 'ADMIN'
      ? setProjects(getProjects?.data)
      : setProjects(getMemberProjects?.data?.project);
  }, [getProjects, getMemberProjects, user?.user?.role, isSuccess]);

  if (isLoading) {
    return <PageLoading />;
  }

  console.log('user : ', projects);

  return (
    <MainLayout>
      <ProjectLayout pathname={pathname}>
        <Space h={50} />

        <SimpleGrid
          breakpoints={[
            {
              minWidth: 'sm',
              cols: 1,
            },
            {
              minWidth: 'lg',
              cols: 3,
            },
          ]}
          mx={largeScreen ? 0 : '1rem'}
          spacing={'xl'}
        >
          {projects?.map((project: any) => (
            <ProjectCard
              key={project.id}
              width={340}
              height={340}
              member={project.member}
              platform={project.platform}
              projectName={project.projectName}
              deadline={project.endDate}
              description={project.description}
              projectIcon={project.projectIcon}
              task={project.task}
              projectId={project.id}
            />
          ))}
        </SimpleGrid>
      </ProjectLayout>
    </MainLayout>
  );
};

export default ProjectAdmin;
