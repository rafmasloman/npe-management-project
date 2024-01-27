import SEO from '@/src/components/SEO/seo.component';
import HeaderPage from '@/src/components/header/header-page.component';
import MainLayout from '@/src/layouts/main.layout';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import { Container, Space } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import cookie from 'cookie';
import { __setSSRAuthCookie } from '@/src/utils/cookie.util';
import InvoiceForm from '@/src/components/form/invoice/invoice.form';
import InvoiceQueryAPI from '@/pages/api/invoice/invoice-query';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { params, req } = ctx;

  const invoiceId = params?.id;

  const cookieToken = cookie.parse(req.headers.cookie!) as any;

  __setSSRAuthCookie(cookieToken?.token);

  const invoiceDetail = await InvoiceQueryAPI.getInvoiceDetail(
    invoiceId as string,
  );

  return { props: { invoiceDetail } };
}

const EditInvoicePage = ({ invoiceDetail }: any) => {
  const { pathname } = useRouter();

  return (
    <MainLayout>
      <SEO title="Edit Invoice" description="Edit Invoice Management" />

      <Container size={'xl'}>
        <HeaderPage
          pageTitle={getCurrentPage(pathname) + ' Management'}
          role={getCurrentRole(pathname)}
        />

        <Space h={50} />

        <InvoiceForm
          initialValues={{
            invoicesTitle: invoiceDetail.data.invoicesTitle,
            otherInfo: invoiceDetail.data.otherInfo,
            clientId: invoiceDetail.data.client.id,
          }}
        />
      </Container>
    </MainLayout>
  );
};

export default EditInvoicePage;
