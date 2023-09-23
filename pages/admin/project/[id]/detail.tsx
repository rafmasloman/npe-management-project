import MainLayout from '@/src/layouts/main.layout';
import {
  Box,
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

const ProjectDetail = () => {
  const isLoading = useRouteLoader();
  const { query, pathname } = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const projectDetail = projects.find((project) => {
    return project.id.toString() == query.id;
  });

  console.log(projectDetail);

  return (
    <MainLayout>
      <SEO title="detail project" description="" />

      <HeaderPage
        pageTitle={getCurrentPage(pathname)}
        role={getCurrentRole(pathname)}
      />

      <Space h={50} />

      {/* {isLoading && <PageLoading />} */}

      <Stack spacing={'xl'} mx={50}>
        <Group>
          <Image
            src={KartjisLogo.src}
            alt={'Project Showcase'}
            width={60}
            height={100}
          />

          <Text fz={'2.5rem'} fw={600}>
            {projectDetail?.projectName}
          </Text>
        </Group>

        <Text w={'70%'} align="justify">
          Website bagi yang ingin membuat Event mereka sendiri, mengelola dan
          monitoring penjualan tiket secara real-time untuk Event konser, serta
          melakukan manajemen data pengunjung yang hadir ke event dan laporan
          penjualan tiket konser
        </Text>
      </Stack>

      <Space h={50} />

      <Tabs mx={50} styles={{}} defaultValue={'overview'}>
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
          <ProjectOverview projectDetail={projectDetail || {}} />
        </Tabs.Panel>

        <Tabs.Panel value="tasks" pt={rem(50)}>
          <TaskWorkSpace />
        </Tabs.Panel>

        <Tabs.Panel value="payroll" pt={rem(50)}>
          <PayrollSpace />
        </Tabs.Panel>
      </Tabs>

      <Space h={50} />
    </MainLayout>
  );
};

export default ProjectDetail;
