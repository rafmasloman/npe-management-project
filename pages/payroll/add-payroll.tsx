import { ICPayroll } from '@/src/assets/icons/nav-icon/payroll.icon';
import MilestoneForm from '@/src/components/form/milestone/milestone.form.component';
import PayrollForm from '@/src/components/form/payroll/payroll.form.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import { COLORS } from '@/src/constant/colors.constant';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import useRouteLoader from '@/src/utils/routes.event';
import { Anchor, Container, Group, Space, Text, Title } from '@mantine/core';
import { IconArrowNarrowRight, IconChevronRight } from '@tabler/icons-react';
import { useRouter } from 'next/router';

const AddPayroll = () => {
  const { pathname } = useRouter();

  const isLoading = useRouteLoader();

  return (
    <MainLayout>
      {isLoading ? (
        <PageLoading />
      ) : (
        <FormLayout
          pathname={pathname}
          title="Tambah Payroll"
          pageTitle="Tambah Payroll"
          anchorData={[
            {
              id: 1,
              text: 'Payroll',
              href: '/payroll',
              isActiveText: '/payroll',
            },
            {
              id: 2,
              text: 'Tambah Payroll',
              href: '/add-payroll',
              isActiveText: '/add-payroll',
            },
          ]}
        >
          <Container
            size={'xl'}
            className="bg-white p-12 rounded-xl border border-solid border-gray-200"
          >
            <Group spacing={20}>
              <Text className="text-2xl font-semibold">Tambah Payroll</Text>
              <ICPayroll width={30} height={30} />
            </Group>

            <Space h={60} />

            <PayrollForm />
          </Container>
        </FormLayout>
      )}
    </MainLayout>
  );
};

export default AddPayroll;
