import MainLayout from '@/src/layouts/main.layout';
import {
  Box,
  Card,
  Container,
  Grid,
  Group,
  Menu,
  SimpleGrid,
  Space,
  Stack,
  Tabs,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import Image from 'next/image';
import KartjisLogo from '@/src/assets/illustration/kartjis.png';
import SubDetail from '@/src/components/project/project-sub-detail.component';
import { members } from '@/pages/api/dummy/member.dummy.api';
import PersonCard from '@/src/components/card/person-card.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import useRouteLoader from '@/src/utils/routes.event';
import { projects } from '@/pages/api/dummy/project.dummy.api';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { COLORS } from '@/src/constant/colors.constant';
import SEO from '@/src/components/SEO/seo.component';
import HeaderPage from '@/src/components/header/header-page.component';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import ModalForm from '@/src/components/modal/modal-form.component';
import TaskForm from '@/src/components/form/task.form.component';
import HeaderStatus from '@/src/components/header/header-task-status.component';
import TaskCard from '@/src/components/card/task-card.component';
import { IconTrash } from '@tabler/icons-react';
import ProjectOverview from '@/src/layouts/project-overview.layout';
import TaskWorkSpace from '@/src/layouts/task-workspace.layout';
import PayrollSpace from '@/src/layouts/payrol.layout';
import { useGetProjectDetailQuery } from '@/src/hooks/project/useGetProjectDetailQuery';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import ProjectsQueryApi from '@/pages/api/project/project-query';
import cookie from 'cookie';
import {
  __getSSRAuthCookie,
  __setSSRAuthCookie,
} from '@/src/utils/cookie.util';

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

const ProjectDetail = ({ projectDetail }: any) => {
  const isLoading = useRouteLoader();
  const { query, pathname } = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  // const { data: project } = useGetProjectDetailQuery(query.id as string);

  const project = projectDetail!.data!.project;
  console.log('project detail : ', project);
  return (
    <MainLayout>
      <SEO title="detail project" description="" />

      <Container size={'xl'} className="px-4 md:px-10 lg:px-14" px={0}>
        <HeaderPage
          pageTitle={getCurrentPage(pathname)}
          role={getCurrentRole(pathname)}
        />

        <Space h={50} />

        {/* {isLoading && <PageLoading />} */}

        <Stack>
          <Group>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${project?.projectIcon}`}
              alt={'Project Showcase'}
              width={60}
              height={70}
              quality={100}
            />

            <Text fz={'2.5rem'} fw={600}>
              {project?.projectName}
            </Text>
          </Group>

          <Text className="w-full md:w-2/3" ta="justify">
            {project?.description}
          </Text>
        </Stack>

        <Space h={50} />

        <Tabs styles={{}} defaultValue={'overview'}>
          <Tabs.List>
            <Tabs.Tab
              fz={rem(16)}
              mr={rem(50)}
              value="overview"
              pb={rem(20)}
              color={'#F79F1A'!}
              style={{
                borderWidth: 3,
                bottom: 0,
              }}
              pl={0}
            >
              Overview
            </Tabs.Tab>
            <Tabs.Tab
              fz={rem(16)}
              mr={rem(50)}
              pb={rem(20)}
              pl={0}
              value="tasks"
              style={{
                borderWidth: 3,
              }}
            >
              Tasks
            </Tabs.Tab>
            <Tabs.Tab
              fz={rem(16)}
              mr={rem(50)}
              pb={rem(20)}
              pl={0}
              value="milestone"
              style={{
                borderWidth: 3,
              }}
            >
              Milestone
            </Tabs.Tab>

            <Tabs.Tab
              fz={rem(16)}
              mr={rem(50)}
              pb={rem(20)}
              pl={0}
              value="payroll"
              style={{
                borderWidth: 3,
              }}
            >
              Payroll
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" pt={rem(50)}>
            <ProjectOverview projectDetail={project || {}} />
          </Tabs.Panel>

          <Tabs.Panel value="tasks" pt={rem(50)}>
            <TaskWorkSpace todos={projectDetail?.data?.todos} />
          </Tabs.Panel>

          <Tabs.Panel value="payroll" pt={rem(50)}>
            <PayrollSpace projectPrice={projectDetail?.priceDeals!} />
          </Tabs.Panel>
        </Tabs>

        <Space h={50} />
      </Container>
    </MainLayout>
  );
};

export default ProjectDetail;
