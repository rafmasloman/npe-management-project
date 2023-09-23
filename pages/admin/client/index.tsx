import SEO from '@/src/components/SEO/seo.component';
import ButtonNavigate from '@/src/components/button/button-link.component';
import HeaderPage from '@/src/components/header/header-page.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import { COLORS } from '@/src/constant/colors.constant';
import MainLayout from '@/src/layouts/main.layout';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import useRouteLoader from '@/src/utils/routes.event';
import useRouteEvents from '@/src/utils/routes.event';
import { Button, Divider, Loader, Space } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ClientAdmin = () => {
  const { pathname } = useRouter();
  const isLoading = useRouteLoader();

  return (
    <MainLayout>
      {isLoading && <PageLoading />}
      <SEO title="Clients" description="client page for npe pro" />

      <HeaderPage
        pageTitle={getCurrentPage(pathname)}
        role={getCurrentRole(pathname)}
      />

      <Space h={50} />

      <ButtonNavigate
        icon={<IconPlus />}
        url={`/${getCurrentRole(pathname)}/${getCurrentPage(
          pathname,
        )}/add-client`}
      >
        Add Project
      </ButtonNavigate>
    </MainLayout>
  );
};

export default ClientAdmin;
