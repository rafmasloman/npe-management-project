import SEO from '@/src/components/SEO/seo.component';
import UserProfile from '@/src/components/profile/user-profile.component';
import MainLayout from '@/src/layouts/main.layout';
import {
  Box,
  Flex,
  Group,
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
import TaskCard from '@/src/components/card/task-card.component';
import MilestoneCard from '@/src/components/card/milestone-card.component';
import HeaderPage from '@/src/components/header/header-page.component';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';

const DashboardAdmin = () => {
  const { pathname } = useRouter();

  return (
    <MainLayout>
      <SEO title="Dashboard" description="dashboard npe management projects" />

      <HeaderPage
        pageTitle={getCurrentPage(pathname)}
        role={getCurrentRole(pathname)}
      />

      <Space h={40} />

      <Group mx={50} position="apart">
        <DashboardCard name="Rafly" />
        <Stack w={300} spacing={'lg'}>
          <HeaderTitle
            href={`/${getCurrentRole(pathname)}/members`}
            title="Team Member"
          />
          <TeamCard name="Richard Enrico" position="Front-End" />
          <TeamCard name="Richard Enrico" position="Front-End" />
        </Stack>
      </Group>

      <Space h={20} />

      <Box w={600} mx={50}>
        <HeaderTitle
          href={`/${getCurrentRole(pathname)}/projects`}
          title="Projects"
        />

        <Space h={30} />

        <Flex justify={'space-between'} wrap="nowrap" w={'100%'}>
          <ProjectCard
            // member={members}
            tag={platformService}
            projectName="Kartjis"
            deadline="12 Desember 2023"
            taskComplete={2}
            tasks={tasks}
          />
          <ProjectCard
            // member={members}
            tag={platformService}
            projectName="Kartjis"
            deadline="12 Desember 2023"
            taskComplete={2}
            tasks={tasks}
          />
        </Flex>
      </Box>

      <Space h={50} />

      <SimpleGrid cols={2} mx={50} spacing={70}>
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
    </MainLayout>
  );
};

export default DashboardAdmin;
