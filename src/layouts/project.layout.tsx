import { Container, Space } from '@mantine/core';
import SEO from '../components/SEO/seo.component';
import HeaderPage from '../components/header/header-page.component';
import { getCurrentPage, getCurrentRole } from '../utils/page.util';
import ButtonNavigate from '../components/button/button-link.component';
import { IconPlus } from '@tabler/icons-react';

const ProjectLayout = ({ pathname, children }: ILayoutProps) => {
  return (
    <>
      <SEO title="projects" description="client page for npe pro" />

      <Container size={'xl'} className="px-4 md:px-10 lg:px-16">
        <HeaderPage
          pageTitle={getCurrentPage(pathname)}
          role={getCurrentRole(pathname)}
        />

        <Space h={50} />

        <ButtonNavigate
          icon={<IconPlus />}
          url={`/${getCurrentPage(pathname)}/add-project`}
        >
          Add Project
        </ButtonNavigate>
      </Container>
      {children}
    </>
  );
};

export default ProjectLayout;
