import SEO from '@/src/components/SEO/seo.component';
import UserProfile from '@/src/components/profile/user-profile.component';
import MainLayout from '@/src/layouts/main.layout';
import {
  Box,
  Container,
  Flex,
  Grid,
  Group,
  ScrollArea,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import NPEProLogo from '../../../src/assets/images/npe_pm_logo.png';
import Image from 'next/image';
import ProjectCard from '@/src/components/card/project-card.component';
import { members } from '@/pages/api/dummy/member.dummy.api';
import { platformService } from '@/pages/api/dummy/platform-service.dummy.api';
import { tasks } from '@/pages/api/dummy/task.dummy.api';
import MenuComp from '@/src/components/menu/menu.component';
import TestMenu from '@/src/components/profile/user-profile.component';
import HeaderTitle from '@/src/components/header/header-title.component';
import DashboardCard from '@/src/components/card/dashboard-card.component';
import TeamCard from '@/src/components/card/team-card.component';
import { useRouter } from 'next/router';
import TaskCard from '@/src/components/card/task-progress-card.component';
import MilestoneCard from '@/src/components/card/milestone-card.component';
import HeaderPage from '@/src/components/header/header-page.component';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import PageLoading from '@/src/components/loading/page-loading.component';
import useRouteLoader from '@/src/utils/routes.event';
import { projects } from '@/pages/api/dummy/project.dummy.api';
import { useAuth } from '@/src/hooks/useAuth';
import { ROUTES } from '@/src/constant/routes.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import {
  __deleteBrowserCookie,
  __setSSRAuthCookie,
} from '@/src/utils/cookie.util';
import { UserContext } from '@/src/context/user-credential.context';
import { useContext, useEffect, useState } from 'react';
import { useGetProjectQuery } from '@/src/hooks/project/useGetProjectQuery';
import { useGetMemberQuery } from '@/src/hooks/member/useGetQueryMember';
import { useGetQueryUserProjects } from '@/src/hooks/user/useGetUserProjectQuery';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import UserQueryApi from '../api/user/user-query';
import { IAuthUserCredentialQuery } from '../api/auth/auth-query';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req } = ctx;

  const cookieToken = cookie.parse(req.headers.cookie!) as any;

  __setSSRAuthCookie(cookieToken?.token);

  const userCredential = await IAuthUserCredentialQuery();

  return { props: { userCredential } };
}

const DashboardAdmin = ({ userCredential }: any) => {
  const { pathname } = useRouter();
  const user = useContext(UserContext);

  console.log('user : ', user);

  const [userProject, setUserProject] = useState<any>([]);

  const { data: getMembers } = useGetMemberQuery(2);
  const { data: userProjects, isSuccess } = useGetQueryUserProjects(
    user.user?.id!,
  );

  useEffect(() => {
    if (userProjects?.data) {
      setUserProject(userProjects?.data?.member);
    }
  }, [isSuccess, userProjects?.data]);

  return (
    <MainLayout>
      <SEO title="Dashboard" description="dashboard npe management projects" />

      <Container size={'xl'} className="px-4 mt-0 md:px-12 lg:-mt-16">
        <HeaderPage
          userId={user.user?.id!}
          pageTitle={getCurrentPage(pathname)}
          role={getCurrentRole(pathname)}
        />

        <Space h={40} />

        <Grid grow gutter={50}>
          <Grid.Col lg={7}>
            <DashboardCard name={user.user?.firstname!} />
          </Grid.Col>

          <Grid.Col lg={5}>
            <Stack className="w-full " align="start" spacing={'lg'}>
              <HeaderTitle
                href={`/${getCurrentRole(pathname)}/members`}
                title="Team Member"
              />
              {getMembers?.data?.map((member: any) => {
                return (
                  <TeamCard
                    key={member.id}
                    name={
                      !member.user?.firstname || !member.user?.lastname
                        ? 'Noname'
                        : `${member.user?.firstname} ${member.user?.lastname}`
                    }
                    position={member.position}
                  />
                );
              })}
            </Stack>
          </Grid.Col>
        </Grid>

        <Space h={30} />

        <Box className="w-full md:w-4/5 lg:w-full">
          <HeaderTitle href={`/project`} title="Projects" />

          <Space h={30} />

          {/* <ScrollArea className="w-screen sm:w-full"> */}
          <div className="w-full  flex flex-col md:flex-row md:justify-between">
            {userProject?.project?.map((project: any) => (
              <ProjectCard
                key={project.id}
                projectId={project.id}
                width={340}
                height={340}
                member={project.member}
                platform={project.platform}
                projectName={project.projectName}
                deadline={project.endDate}
                description={project.description}
                projectIcon={project.projectIcon}
                task={project.task}
              />
            ))}
          </div>
          {/* </ScrollArea> */}
        </Box>

        <Space h={50} />

        <SimpleGrid
          breakpoints={[
            {
              minWidth: 'sm',
              cols: 1,
            },
            {
              minWidth: 'lg',
              cols: 2,
            },
          ]}
          spacing={70}
        >
          <Box>
            <HeaderTitle href={`/milestone`} title="Milestone" />
            <Space h={'xl'} />

            <Group>
              <MilestoneCard
                title="Integrasi API dari Back End"
                description="Front End Melakukan Integrasi API yang sudah dibuat oleh back end "
              />
              <MilestoneCard
                title="Integrasi API dari Back End"
                description="Front End Melakukan Integrasi API yang sudah dibuat oleh back end "
              />
            </Group>
          </Box>
          <Box>
            <HeaderTitle
              href={`/${getCurrentRole(pathname)}/tasks`}
              title="Task"
            />
            <Space h={'xl'} />

            <Group>
              {/* <TaskCard
                title="Slicing Homepage"
                progressValue={56}
                projectName="Kartjis"
              />
              <TaskCard
                title="Slicing Homepage"
                progressValue={56}
                projectName="Kartjis"
              /> */}
              {userProject?.task?.map((task: any) => {
                return (
                  <TaskCard
                    key={task.name}
                    title={task.name}
                    progressValue={56}
                    projectName={task.project.projectName}
                    projectIcon={task.project.projectIcon}
                  />
                );
              })}
            </Group>
          </Box>
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};

export default DashboardAdmin;
