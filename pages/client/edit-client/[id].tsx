import SEO from '@/src/components/SEO/seo.component';
import ClientForm from '@/src/components/form/client/client.form.component';
import HeaderPage from '@/src/components/header/header-page.component';
import MainLayout from '@/src/layouts/main.layout';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import { Container, Space } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import cookie from 'cookie';
import { __setSSRAuthCookie } from '@/src/utils/cookie.util';
import ClientQueryApi from '@/pages/api/client/client-query.api';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { params, req } = ctx;

  const clientId = params?.id;

  const cookieToken = cookie.parse(req.headers.cookie!) as any;

  __setSSRAuthCookie(cookieToken?.token);

  const clientDetail = await ClientQueryApi.getClientDetail(clientId as string);

  return { props: { clientDetail } };
}

const EditClient = ({ clientDetail }: any) => {
  const { pathname } = useRouter();

  return (
    <MainLayout>
      <SEO title="Edit Client" description="Edit Client Management" />

      <Container size={'xl'}>
        <HeaderPage
          pageTitle={getCurrentPage(pathname) + ' Management'}
          role={getCurrentRole(pathname)}
        />

        <Space h={50} />

        <ClientForm
          initialValues={{
            name: clientDetail.data.name,
            address: clientDetail.data.address,
            phoneNumber: clientDetail.data.phoneNumber,
            email: clientDetail.data.email,
            project: clientDetail.data.project,
          }}
        />
      </Container>
    </MainLayout>
  );
};

export default EditClient;
