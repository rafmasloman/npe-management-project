import MainLayout from '@/src/layouts/main.layout';
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Group,
  Menu,
  Progress,
  SimpleGrid,
  Space,
  Stack,
  Tabs,
  Text,
  TextInput,
  Tooltip,
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
import TaskForm from '@/src/components/form/task/task.form.component';
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
import { UserContext } from '@/src/context/user-credential.context';
import MilestoneSpace from '@/src/layouts/milestone-workspace.layout';
import TabList from '@/src/components/tab/tab-list.component';
import InviteMemberForm from '@/src/components/form/project/invite-member.form.component';

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

  const { data: projects } = useGetProjectDetailQuery(query.id as string);

  const project = projects?.data?.project!;

  console.log('progress : ', project?.progress);

  return (
    <MainLayout>
      <SEO title="detail project" description="" />

      <Container size={'xl'} className="px-4 md:px-10 lg:px-14 h-screen" px={0}>
        <HeaderPage
          pageTitle={getCurrentPage(pathname)}
          role={getCurrentRole(pathname)}
        />

        <Space h={50} />

        {/* {isLoading && <PageLoading />} */}

        <Group position="apart" align="center">
          <Stack spacing={30}>
            <Group>
              <Avatar
                src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${project?.projectIcon}`}
                alt={'Project Showcase'}
                // size={70}
                className="w-16 h-fit"
                radius={'100%'}
              />

              <Text fz={'2.5rem'} fw={600}>
                {project?.projectName}
              </Text>
            </Group>

            <Text className="w-full md:w-2/3" ta="justify">
              {project?.description}
            </Text>

            <Group>
              <Text className="text-gray-400">Avaiable on : </Text>
              {project?.platform
                ?.split(',')
                .map((platform: any, index: number) => {
                  return (
                    <Text
                      key={platform}
                      fz={'0.75rem'}
                      bg={index % 2 === 0 ? COLORS.SECONDARY : COLORS.THIRD}
                      px={10}
                      py={4}
                      color="white"
                      style={{
                        borderRadius: '7px',
                      }}
                    >
                      {platform}
                    </Text>
                  );
                })}
            </Group>

            <Group>
              <Text className="text-gray-400">Project Progress : </Text>
              <Progress
                value={!project?.progress ? 0 : project?.progress}
                label={`${!project?.progress ? 0 : project?.progress}%`}
                radius={'lg'}
                size={'lg'}
                className="w-[300px] h-[18px]"
                color={
                  project?.progress > 0 && project?.progress < 100
                    ? COLORS.PRIMARY
                    : project?.progress === 100
                    ? 'green'
                    : 'gray'
                }
                styles={{
                  label: {
                    fontSize: rem(12),
                    fontWeight: 500,
                  },
                }}
              />
            </Group>
          </Stack>

          <Stack>
            <Group align="end" position="right">
              <Stack spacing={10}>
                <Text className="text-sm text-gray-400 font-medium">
                  Teams Project
                </Text>
                <Avatar.Group spacing={'md'}>
                  {project?.member?.map((member: any, index: number) => {
                    return (
                      <Tooltip key={index} label={`${member.user?.firstname}`}>
                        <Avatar
                          radius={'xl'}
                          size={45}
                          src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${member.profilePicture}`}
                          className="border border-solid border-gray-300"
                        />
                      </Tooltip>
                    );
                  })}
                </Avatar.Group>
              </Stack>

              <ModalForm
                btnText="Invite Member"
                title="Invite Member to Project"
                // variant="outline"
                colorBtn={COLORS.PRIMARY}
              >
                <InviteMemberForm project={project} />
              </ModalForm>
            </Group>
          </Stack>
        </Group>

        <Space h={30} />

        <Tabs styles={{}} defaultValue={'overview'}>
          <TabList />

          <Tabs.Panel value="overview" pt={rem(50)}>
            <ProjectOverview projectDetail={project} />
          </Tabs.Panel>

          <Tabs.Panel value="tasks" pt={rem(50)}>
            <TaskWorkSpace todos={projects?.data?.todos} />
          </Tabs.Panel>

          <Tabs.Panel value="milestone">
            <MilestoneSpace project={project} />
          </Tabs.Panel>
        </Tabs>

        <Space h={50} />
      </Container>
    </MainLayout>
  );
};

export default ProjectDetail;
