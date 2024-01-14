import SEO from '@/src/components/SEO/seo.component';
import UserProfile from '@/src/components/profile/user-profile.component';
import MainLayout from '@/src/layouts/main.layout';
import {
  Box,
  Container,
  Flex,
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
import { __deleteBrowserCookie } from '@/src/utils/cookie.util';
import { UserContext } from '@/src/context/user-credential.context';
import { useContext } from 'react';
import { useGetProjectQuery } from '@/src/hooks/project/useGetProjectQuery';
import { useGetMemberQuery } from '@/src/hooks/member/useGetQueryMember';

const DashboardAdmin = () => {
  const { pathname } = useRouter();
  const user = useContext(UserContext);

  console.log('user : ', user);

  const isLoading = useRouteLoader();
  const { replace, push } = useRouter();
  const { logout } = useAuth();

  const { data: getProjects } = useGetProjectQuery(String(3));
  const { data: getMembers } = useGetMemberQuery(2);

  console.log('members : ', getMembers);

  const handleLogout = () => {
    __deleteBrowserCookie(TOKEN_NAME);

    replace(ROUTES.LOGIN);
  };

  return (
    <MainLayout>
      {/* {isLoading && <PageLoading />} */}

      <SEO title="Dashboard" description="dashboard npe management projects" />

      <Container size={'xl'} className="px-4 mt-0 md:px-12 lg:-mt-16">
        <HeaderPage
          pageTitle={getCurrentPage(pathname)}
          role={getCurrentRole(pathname)}
          onClick={handleLogout}
        />

        <Space h={40} />

        <SimpleGrid
          breakpoints={[
            {
              minWidth: 'sm',
              cols: 1,
            },
            {
              minWidth: 'md',
              cols: 2,
            },
          ]}
          spacing={50}
        >
          <DashboardCard name={user.user?.fullname!.split(' ')[0]!} />
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
                    !member.user?.fullname ? 'Noname' : member.user?.fullname
                  }
                  position={member.position}
                />
              );
            })}
          </Stack>
        </SimpleGrid>

        <Space h={30} />

        <Box className="w-full md:w-4/5 lg:w-full">
          <HeaderTitle
            href={`/${getCurrentRole(pathname)}/projects`}
            title="Projects"
          />

          <Space h={30} />

          {/* <ScrollArea className="w-screen sm:w-full"> */}
          <div className="w-full  flex flex-col md:flex-row md:justify-between">
            {getProjects?.data?.map((project: any) => (
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
            <HeaderTitle
              href={`/${getCurrentRole(pathname)}/milestone`}
              title="Milestone"
            />
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
              <TaskCard
                title="Slicing Homepage"
                progressValue={56}
                projectName="Kartjis"
              />
              <TaskCard
                title="Slicing Homepage"
                progressValue={56}
                projectName="Kartjis"
              />
            </Group>
          </Box>
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};

export default DashboardAdmin;
