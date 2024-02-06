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
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import {
  IconPencilCode,
  IconPencilExclamation,
  IconSend,
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
import { IconSearch } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useGetClientsQuery } from '@/src/hooks/client/useGetClient';
import { IconPlaneDeparture } from '@tabler/icons-react';
import { useDeleteClient } from '@/src/hooks/client/useDeleteClient';
import ModalAction from '@/src/components/modal/modal-action.component';
import Image from 'next/image';
import NoDataCard from '@/src/components/card/no_data-card.component';
import { ICTeams } from '@/src/assets/icons/nav-icon/teams.icon';
import { useGetMemberQuery } from '@/src/hooks/member/useGetQueryMember';

const MemberPage = () => {
  const { pathname, push, replace } = useRouter();
  const user = useContext(UserContext);

  const [clientId, setClientId] = useState('');
  const [
    openedDeleteConfirmation,
    { open: openModalDelete, close: closeModalDelete },
  ] = useDisclosure(false);

  const { data: members, isLoading } = useGetMemberQuery();
  const { mutate: deleteClient, isSuccess, isPending } = useDeleteClient();


  const searchForm = useForm({
    initialValues: {
      searchValue: '',
    },
  });

  const tableHead = [
    {
      title: 'No',
    },
    {
      title: 'Nama',
    },
    {
      title: 'Posisi',
    },
    {
      title: 'No. Telp',
    },
    {
      title: 'Aksi',
    },
  ];

  // const [searchValue, setSearchValue] = useState(query.q || '');

  // const handleSearchSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(event.currentTarget.value);

  //   push({
  //     query: { q: event.currentTarget.value },
  //   });
  // };

  const openModalConfirmationDelete = (clientId: string) => {
    setClientId(clientId);

    openModalDelete();
  };

  const handleSearchSubmit = searchForm.onSubmit((values) => {
    if (values.searchValue.trim() !== '') {
      push({
        query: { q: values.searchValue },
      });
    } else {
      push('/project');
    }
  });

  const handleDeleteClient = () => {
    deleteClient(clientId);

    if (!isPending) {
      closeModalDelete();
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <MainLayout>
      <SEO title="Client" description="Client Management" />

      <ModalAction
        headerText="Hapus Data Task?"
        message="Data yang telah dihapus tidak dapat dikembalikan"
        type="delete"
        opened={openedDeleteConfirmation}
        close={closeModalDelete}
      >
        <Group mt={20}>
          <Button
            variant=""
            onClick={handleDeleteClient}
            w={'48%'}
            loading={isPending}
            radius={'md'}
            c={'white'}
            bg={COLORS.DANGER}
            // disabled={disableNoButton}
          >
            Hapus
          </Button>
          <Button
            // loading={isLoading}
            onClick={closeModalDelete}
            variant="outline"
            w={'48%'}
            radius={'md'}
            c={'red'}
            color="red"
          >
            Batal
          </Button>
        </Group>
      </ModalAction>

      <Container size={'xl'}>
        <HeaderPage
          pageTitle={getCurrentPage(pathname) + ' Management'}
          role={getCurrentRole(pathname)}
        />

        {members?.data?.length <= 0 ? (
          <div className="flex  w-full justify-center mt-[70px]">
            <NoDataCard
              icon={<ICTeams width={50} height={50} />}
              description="Untuk membesarkan perusahaan tentu anda butuh client, tambah client sekarang"
              title="Client"
            >
              <ButtonNavigate
                icon={<IconPlus />}
                url={`/${getCurrentPage(pathname)}/add-client`}
              >
                Tambah Client
              </ButtonNavigate>
            </NoDataCard>
          </div>
        ) : (
          <>
            <Space h={50} />

            <Group position="apart" className="">
              {user.user?.role.includes('STAFF') ? null : (
                <ButtonNavigate
                  icon={<IconPlus />}
                  url={`/${getCurrentPage(pathname)}/add-member`}
                >
                  Tambah Orang
                </ButtonNavigate>
              )}
              <form onSubmit={handleSearchSubmit} className="lg:w-fit w-full">
                <Group className="w-full " position="right">
                  <TextInput
                    placeholder="Cari Member"
                    radius={'md'}
                    className="w-full lg:w-[320px]"
                    {...searchForm.getInputProps('searchValue')}
                    styles={{
                      input: {
                        height: 40,
                      },
                    }}
                  />

                  <button
                    type="submit"
                    className="bg-primary shadow-sm border-0 w-[40px] h-[40px] flex items-center justify-center rounded-lg"
                  >
                    <IconSearch size={21} color={'white'} />
                  </button>
                </Group>
              </form>
            </Group>

            <Space h={50} />
            <Table
              tableHead={tableHead}
              tableRow={members?.data?.map((member: any, index: number) => {
                return (
                  <tr key={member.id} className="text-center">
                    <td className="">{`${index + 1}`}</td>
                    <td className="">{`${member.user?.firstname} ${member.user?.lastname} `}</td>
                    <td className="">{`${member.position} `}</td>
                    <td className="">{`${member.phoneNumber} `}</td>

                    <td className=" ">
                      <Group position="center" className="w-full " spacing={10}>
                        <ActionIcon
                          variant="outline"
                          radius={'xl'}
                          color={'red'}
                          c={COLORS.DANGER}
                          opacity={'0.7'}
                          size={'lg'}
                          onClick={() => openModalConfirmationDelete(member.id)}
                        >
                          <IconTrash size={'1rem'} />
                        </ActionIcon>

                        <ActionIcon
                          variant="outline"
                          radius={'xl'}
                          color={'gray'}
                          c={COLORS.SECONDARY}
                          opacity={'0.7'}
                          size={'lg'}
                          onClick={() => {
                            push(`/member/edit-member/${member.id}`);
                          }}
                        >
                          <IconPencilCode size={'1rem'} />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                );
              })}
            />
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default MemberPage;
