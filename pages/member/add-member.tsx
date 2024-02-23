import { ICTeams } from '@/src/assets/icons/nav-icon/teams.icon';
import MemberForm from '@/src/components/form/member/member.form.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import useRouteLoader from '@/src/utils/routes.event';
import { Container, Group, Space, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';

const AddMember = () => {
  const { pathname } = useRouter();

  const isLoading = useRouteLoader();

  return (
    <MainLayout>
      {isLoading ? (
        <PageLoading />
      ) : (
        <FormLayout
          pathname={pathname}
          title="Tambah Crew"
          pageTitle="Tambah Crew"
          anchorData={[
            { id: 1, text: 'Crew', href: '/member', isActiveText: '/member' },
            {
              id: 2,
              text: 'Tambah Crew',
              href: '/add-member',
              isActiveText: '/add-member',
            },
          ]}
        >
          <Container
            size={'xl'}
            className="bg-white p-12 rounded-xl border border-solid border-gray-200"
          >
            <Group spacing={20}>
              <Text className="text-2xl font-semibold">Tambah Crew</Text>
              <ICTeams width={30} height={30} />
            </Group>

            <Space h={60} />

            <MemberForm />
          </Container>
        </FormLayout>
      )}
    </MainLayout>
  );
};

export default AddMember;
