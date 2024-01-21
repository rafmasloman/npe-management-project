import SEO from '@/src/components/SEO/seo.component';
import ButtonNavigate from '@/src/components/button/button-link.component';
import HeaderPage from '@/src/components/header/header-page.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import Table from '@/src/components/table/table.component';
import { COLORS } from '@/src/constant/colors.constant';
import { useGetQueryUser } from '@/src/hooks/user/useGetQueryUser';
import MainLayout from '@/src/layouts/main.layout';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import useRouteLoader from '@/src/utils/routes.event';
import useRouteEvents from '@/src/utils/routes.event';
import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Group,
  Loader,
  Modal,
  Space,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconPencilCode,
  IconPencilExclamation,
  IconTrashFilled,
  IconTrashOff,
  IconTrashX,
  IconX,
} from '@tabler/icons-react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserMutationApi from '@/pages/api/user/user-mutation';
import { useAuth } from '@/src/hooks/useAuth';
import { ROUTES } from '@/src/constant/routes.constant';
import { useDisclosure } from '@mantine/hooks';
import { useDeleteUser } from '@/src/hooks/user/useDeleteUserMutation';
import { UserContext } from '@/src/context/user-credential.context';
import { ICAlert } from '@/src/assets/icons/alert_delete.icon';

const UserAdmin = () => {
  const { pathname, replace } = useRouter();

  const [userDeleteId, setUserDeleteId] = useState('');

  const isLoading = useRouteLoader();

  const theme = useMantineTheme();

  const { logout } = useAuth();

  const queryClient = useQueryClient();

  const [opened, { close, open }] = useDisclosure(false);

  const tableHead = [
    { title: 'Name' },
    { title: 'Email' },
    // { title: 'Username' },
    { title: 'Role' },
    { title: 'Action' },
  ];

  const { data: readAllUsers } = useGetQueryUser();

  const { mutate: deleteUser } = useDeleteUser();

  const userData = readAllUsers?.data;
  console.log(userData);

  const handleConfirm = (userId: string) => {
    setUserDeleteId(userId);
    open();
  };

  const handleDelete = () => {
    deleteUser(userDeleteId);
    close();
  };

  const handleLogout = () => {
    logout();

    replace(ROUTES.LOGIN);
  };

  return (
    <MainLayout>
      {isLoading && <PageLoading />}
      <SEO title="Users" description="User page for npe pro" />

      <Modal
        opened={opened}
        onClose={close}
        // title="Hapus User"
        withCloseButton={false}
        overlayProps={{
          // color:
          //   theme.colorScheme === 'dark'
          //     ? theme.colors.dark[9]
          //     : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        radius={'lg'}
        styles={{
          body: {
            padding: 20,
          },
        }}
      >
        <div className="flex  justify-between ">
          <Stack spacing={0}>
            <Group>
              <ICAlert width={30} height={30} />
              <Text className="text-xl font-semibold">Hapus Data User?</Text>
            </Group>
            <Text className="text-sm text-gray-400 mt-2.5">
              Data yang telah dihapus tidak dapat dikembalikan
            </Text>
          </Stack>

          <IconX className="text-gray-400 hover:text-black" onClick={close} />
        </div>

        <Group mt={20}>
          <Button
            variant=""
            onClick={() => handleDelete()}
            w={'48%'}
            // loading={isLoading}
            radius={'md'}
            c={'white'}
            bg={COLORS.DANGER}
            // disabled={disableNoButton}
          >
            Hapus
          </Button>
          <Button
            // loading={isLoading}
            onClick={close}
            variant="outline"
            w={'48%'}
            radius={'md'}
            c={'red'}
            color="red"
          >
            Batal
          </Button>
        </Group>
      </Modal>

      <Container size={'xl'} className="px-4 md:px-8 lg:px-14 lg:-mt-12">
        <HeaderPage
          pageTitle={getCurrentPage(pathname)}
          role={getCurrentRole(pathname)}
          onClick={handleLogout}
        />

        <Space h={50} />

        <ButtonNavigate
          icon={<IconPlus />}
          url={`/${getCurrentRole(pathname)}/${getCurrentPage(
            pathname,
          )}/add-user`}
        >
          Tambah User
        </ButtonNavigate>

        <Space h={50} />

        <Table
          tableHead={tableHead}
          tableRow={userData?.map((user: any) => {
            return (
              <tr key={user.id} className="">
                <td className="px-6 py-4 text-center">
                  {user.fullname.split(' ')[0]}
                </td>
                <td className="px-6 py-4 text-center">{user.email}</td>
                <td className="px-6 py-4 text-center">{user.role}</td>
                <td className="px-6 py-4">
                  <Group position="center">
                    <ActionIcon
                      variant="outline"
                      radius={'xl'}
                      color={'red'}
                      c={COLORS.DANGER}
                      opacity={'0.7'}
                      size={'lg'}
                      onClick={() => handleConfirm(user.id)}
                    >
                      <IconTrash size={'1.125rem'} />
                    </ActionIcon>

                    <ActionIcon
                      variant="outline"
                      radius={'xl'}
                      color={'gray'}
                      c={COLORS.SECONDARY}
                      opacity={'0.7'}
                      size={'lg'}
                      onClick={() => {
                        replace(`/admin/user-management/${user.id}/edit-user`);
                      }}
                    >
                      <IconPencilCode size={'1.125rem'} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            );
          })}
        />
      </Container>
    </MainLayout>
  );
};

export default UserAdmin;
