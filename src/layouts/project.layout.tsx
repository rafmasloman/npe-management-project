import { Space } from '@mantine/core';
import SEO from '../components/SEO/seo.component';
import HeaderPage from '../components/header/header-page.component';
import { getCurrentPage, getCurrentRole } from '../utils/page.util';
import ButtonNavigate from '../components/button/button-link.component';
import { IconPlus } from '@tabler/icons-react';

const ProjectLayout = ({ pathname, children }: ILayoutProps) => {
  return (
    <>
      <SEO title="projects" description="client page for npe pro" />

      <HeaderPage
        pageTitle={getCurrentPage(pathname)}
        role={getCurrentRole(pathname)}
      />

      <Space h={50} />

      <ButtonNavigate
        icon={<IconPlus />}
        url={`/${getCurrentRole(pathname)}/${getCurrentPage(
          pathname,
        )}/add-project`}
      >
        Add Project
      </ButtonNavigate>
      {children}
    </>
  );
};

export default ProjectLayout;
