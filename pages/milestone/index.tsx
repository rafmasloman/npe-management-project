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
import { Button, Loader, SimpleGrid, Space } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import DownloadFileAPI from '../api/file/file-query';
import MilestoneLayout from '@/src/layouts/milestone.layout';

const MilestonePages = () => {
  const { pathname } = useRouter();

  return (
    <MainLayout>
      <MilestoneLayout pathname={pathname}>
        <div>Milestone pages</div>
      </MilestoneLayout>
    </MainLayout>
  );
};

export default MilestonePages;
