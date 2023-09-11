import SEO from '@/src/components/SEO/seo.component';
import HeaderPage from '@/src/components/header/header-page.component';
import { COLORS } from '@/src/constant/colors.constant';
import MainLayout from '@/src/layouts/main.layout';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import { Button, Divider, Space } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ClientAdmin = () => {
  const { pathname } = useRouter();
  return (
    <MainLayout>
      <SEO title="Clients" description="client page for npe pro" />

      <HeaderPage
        pageTitle={getCurrentPage(pathname)}
        role={getCurrentRole(pathname)}
      />

      <Space h={50} />

      <Link href={`/${getCurrentRole(pathname)}/add-client`}>
        <Button
          rel="noopener noreferrer"
          leftIcon={<IconPlus />}
          bg={COLORS.PRIMARY}
          radius={'md'}
          ml={50}
        >
          Add Client
        </Button>
      </Link>
    </MainLayout>
  );
};

export default ClientAdmin;
