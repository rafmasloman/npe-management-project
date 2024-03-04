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
  Avatar,
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
import TableLayout from '@/src/layouts/form/table.layout';
import { useDeleteMemberMutation } from '@/src/hooks/member/useDeleteMemberMutation';

const MemberPage = () => {
  const { pathname, push, replace } = useRouter();
  const user = useContext(UserContext);

  const [memberId, setMemberId] = useState('');
  const [
    openedDeleteConfirmation,
    { open: openModalDelete, close: closeModalDelete },
  ] = useDisclosure(false);

  const { data: members } = useGetMemberQuery();
  const {
    mutate: deleteMember,
    isSuccess,
    isPending,
  } = useDeleteMemberMutation();

  const searchForm = useForm({
    initialValues: {
      searchValue: '',
    },
  });

  const isLoading = useRouteLoader();

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

  const openModalConfirmationDelete = (memberId: string) => {
    setMemberId(memberId);

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

  const handleDeleteMember = () => {
    deleteMember(memberId);

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
            onClick={handleDeleteMember}
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

        <Space h={50} />

        <TableLayout
          layoutTitle={`${members?.data?.length} Crew`}
          addUrl="/add-member"
          icon={<ICTeams width={30} height={30} />}
        >
          {members?.data?.length <= 0 ? (
            <div className="flex  w-full justify-center mt-[70px]">
              <NoDataCard
                icon={<ICTeams width={50} height={50} />}
                description="Untuk mengerjakan project dibutuhkan tim yang baik, tambah crew sekarang"
                title="Crew"
              >
                <ButtonNavigate
                  icon={<IconPlus />}
                  url={`/${getCurrentPage(pathname)}/add-member`}
                >
                  Tambah Crew
                </ButtonNavigate>
              </NoDataCard>
            </div>
          ) : (
            <div className="px-8 overflow-x-scroll lg:overflow-x-hidden">
              <Table
                tableHead={tableHead}
                tableRow={members?.data?.map((member: any, index: number) => {
                  return (
                    <tr key={member.id} className="">
                      <td className="">{`${index + 1}`}</td>
                      <td className="">
                        <div className="flex flex-row items-center gap-5">
                          <Avatar
                            radius={'xl'}
                            size={36}
                            src={
                              !member.profilePicture
                                ? ''
                                : `${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${member?.profilePicture}`
                            }
                          />

                          <Text className="text-left">
                            {`${member?.user?.firstname} ${member?.user?.lastname}`}
                          </Text>
                        </div>
                      </td>
                      <td className="">{`${member.position} `}</td>
                      <td className="">{`${member.phoneNumber} `}</td>

                      <td className=" ">
                        <Group position="left" className="w-full " spacing={10}>
                          <ActionIcon
                            variant="outline"
                            radius={'xl'}
                            color={'red'}
                            c={COLORS.DANGER}
                            opacity={'0.7'}
                            size={'lg'}
                            onClick={() =>
                              openModalConfirmationDelete(member.id)
                            }
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
                              push(`/member/${member.id}/edit-member`);
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
            </div>
          )}
        </TableLayout>
      </Container>
    </MainLayout>
  );
};

export default MemberPage;
