import SEO from '@/src/components/SEO/seo.component';
import HeaderPage from '@/src/components/header/header-page.component';
import { getCurrentRole } from '@/src/utils/page.util';
import { Space } from '@mantine/core';

const ClientFormLayout = ({ children, pathname }: ILayoutProps) => {
  return (
    <>
      <SEO title="Add Client" description="" />

      <HeaderPage pageTitle="Create Client" role={getCurrentRole(pathname)} />

      <Space h={50} />

      {children}
    </>
  );
};

export default ClientFormLayout;
