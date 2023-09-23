import SEO from '@/src/components/SEO/seo.component';
import HeaderPage from '@/src/components/header/header-page.component';
import { getCurrentRole } from '@/src/utils/page.util';
import { Space } from '@mantine/core';

const FormLayout = ({
  children,
  pathname,
  pageTitle,
  title,
}: IFormLayoutProps) => {
  return (
    <>
      <SEO title={title} description="" />

      <HeaderPage pageTitle={pageTitle} role={getCurrentRole(pathname)} />

      <Space h={50} />

      {children}
    </>
  );
};

export default FormLayout;
