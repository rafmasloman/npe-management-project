import SEO from '@/src/components/SEO/seo.component';
import MainLayout from '@/src/layouts/main.layout';
import {
  Box,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Space,
  Stack,
} from '@mantine/core';
import ProjectCard from '@/src/components/card/project-card.component';
import HeaderTitle from '@/src/components/header/header-title.component';
import DashboardCard from '@/src/components/card/dashboard-card.component';
import TeamCard from '@/src/components/card/team-card.component';
import { useRouter } from 'next/router';
import MilestoneCard from '@/src/components/card/milestone-card.component';
import HeaderPage from '@/src/components/header/header-page.component';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
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
import DataCard from '@/src/components/card/data-card.component';
import { DASHBOARD_DATA_FEATURE } from '@/src/utils/dashboard.util';
import { useGetAllTaskQuery } from '@/src/hooks/task/useGetAllTaskQuery';
import TaskCard from '@/src/components/card/task-card.component';
import TaskCardDashboard from '@/src/shared/card/components/task-card.component';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req } = ctx;

  const cookieToken = cookie.parse(req.headers.cookie!) as any;

  __setSSRAuthCookie(cookieToken?.token);

  const userCredential = await IAuthUserCredentialQuery();

  return { props: { userCredential } };
}

const Dashboard = ({ userCredential }: any) => {
  const { pathname } = useRouter();
  const user = useContext(UserContext);

  const [projects, setProjects] = useState<any>([]);
  const [tasks, setTasks] = useState<any>([]);

  const { data: getMembers } = useGetMemberQuery(2);
  const { data: userProjects, isSuccess } = useGetQueryUserProjects(
    user.user?.id!,
  );

  const { data: allProjects } = useGetProjectQuery(undefined, '');
  const { data: allTasks } = useGetAllTaskQuery();

  useEffect(() => {
    // if (userProjects?.data) {
    //   setProjects(userProjects?.data?.member);
    // }

    if (user?.user?.role === 'ADMIN') {
      setProjects(allProjects?.data);
      setTasks(allTasks?.data);
    } else {
      setProjects(userProjects?.data?.member?.project);
    }
  }, [
    user?.user?.role,
    allProjects?.data,
    userProjects?.data?.member?.project,
    allTasks?.data,
  ]);

  projects?.task?.map((t: any) => {
    console.log('projects : ', t);
  });

  console.log('task : ', tasks);

  return (
    <MainLayout>
      <SEO title="Dashboard" description="dashboard npe management projects" />

      <Container size={'lg'} className="px-4 mt-0  overflow-hidden lg:-mt-16 ">
        <HeaderPage
          userId={user.user?.id!}
          pageTitle={getCurrentPage(pathname)}
          role={getCurrentRole(pathname)}
        />

        <Space h={40} />

        <SimpleGrid
          breakpoints={[
            { minWidth: 'sm', cols: 1 },
            {
              minWidth: 'md',
              cols: 2,
            },
            {
              minWidth: 'lg',
              cols: 4,
            },
          ]}
        >
          {DASHBOARD_DATA_FEATURE.map((data) => {
            return (
              <DataCard
                title={data.title}
                key={data.id}
                icon={<data.icon width={25} height={25} />}
                totalData={data.totalData}
                color={data.color}
              />
            );
          })}
        </SimpleGrid>
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
          <div className="w-full  flex flex-col md:flex-row  gap-10">
            {projects?.map((project: any, index: number) => (
              <ProjectCard
                key={index}
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

            <Stack>
              {tasks?.map((task: any, index: number) => {
                console.log('task : ', projects);

                return (
                  <TaskCardDashboard
                    key={index}
                    projectIcon={task.project.projectIcon}
                    projectName={task.project.projectName}
                    status={task.status}
                    title={task.name}
                    priority={task.priority}
                  />
                );
              })}
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
