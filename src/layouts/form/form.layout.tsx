import SEO from '@/src/components/SEO/seo.component';
import HeaderPage from '@/src/components/header/header-page.component';
import { getCurrentRole } from '@/src/utils/page.util';
import { Container, Space } from '@mantine/core';

const FormLayout = ({
  children,
  pathname,
  pageTitle,
  title,
}: IFormLayoutProps) => {
  return (
    <>
      <SEO title={title} description="" />

      <Container className="px-4 md:px-10 lg:px-16 lg:-mt-12" size={'xl'}>
        <HeaderPage pageTitle={pageTitle} role={getCurrentRole(pathname)} />

        <Space h={50} />

        {children}
      </Container>
    </>
  );
};

export default FormLayout;
