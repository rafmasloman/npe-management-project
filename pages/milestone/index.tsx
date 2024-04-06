import { platformService } from '@/pages/api/dummy/platform-service.dummy.api';
import { projects } from '@/pages/api/dummy/project.dummy.api';
import { tasks } from '@/pages/api/dummy/task.dummy.api';
import SEO from '@/src/components/SEO/seo.component';
import ButtonNavigate from '@/src/components/button/button-link.component';
import ProjectCard from '@/src/components/card/project-card.component';
import HeaderPage from '@/src/components/header/header-page.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import { COLORS } from '@/src/constant/colors.constant';
import { useGetProjectQuery } from '@/src/hooks/project/useGetProjectQuery';
import { IProjectCardProps } from '@/src/interfaces/project.interface';
import MainLayout from '@/src/layouts/main.layout';
import ProjectLayout from '@/src/layouts/project.layout';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import useRouteLoader from '@/src/utils/routes.event';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Container,
  Group,
  Loader,
  Pagination,
  SimpleGrid,
  Space,
  Text,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconPencilCode, IconPlus, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import DownloadFileAPI from '../api/file/file-query';
import MilestoneLayout from '@/src/layouts/milestone.layout';
import { useGetAllMilestone } from '@/src/hooks/milestone/useGetAllMilestones';
import MilestoneCard from '@/src/components/card/milestone-card.component';
import Image from 'next/image';
import moment from 'moment';
import { ICDeadline } from '@/src/assets/icons/deadlin.icon';
import { useDeleteMilestone } from '@/src/hooks/milestone/useDeleteMilestone';
import ModalAction from '@/src/components/modal/modal-action.component';
import TableLayout from '@/src/layouts/form/table.layout';
import { ICMilestone } from '@/src/assets/icons/nav-icon/milestone.icon';
import NoDataCard from '@/src/components/card/no_data-card.component';
import Table from '@/src/components/table/table.component';
import { useModal } from '@/src/hooks/useModal';

const MilestonePages = () => {
  const { pathname, replace } = useRouter();

  const { data: milestones, isLoading } = useGetAllMilestone();
  const { mutate: deleteMilestone } = useDeleteMilestone();

  const { opened, open, close, itemId, handleConfirm } = useModal();

  const [activePage, setPage] = useState(1);
  const [milestoneId, setMilestoneId] = useState('');
  const [isMilestoneAvaiable, setIsMilestoneAvaiable] = useState(false);

  const tableHead = [
    { title: 'Name' },
    { title: 'Project' },
    { title: 'Tanggal Mulai' },
    { title: 'Deadline' },
    { title: 'Status' },
    { title: 'Action' },
  ];

  const openModalConfirmationDelete = (milestoneId: string) => {
    setMilestoneId(milestoneId);
    open();
  };

  const handleDeleteMilestone = (milestoneId: string) => {
    deleteMilestone(milestoneId!);

    close();
  };

  useEffect(() => {
    if (milestones?.data?.length > 0) {
      setIsMilestoneAvaiable(!isMilestoneAvaiable);
    }
  }, [milestones, isMilestoneAvaiable]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <MainLayout>
      <ModalAction
        headerText="Hapus Data Milestone?"
        message="Data yang telah dihapus tidak dapat dikembalikan"
        type="delete"
        opened={opened}
        close={close}
      >
        <Group mt={20}>
          <Button
            variant=""
            onClick={() => handleDeleteMilestone(milestoneId)}
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
      </ModalAction>

      <Container size={'lg'}>
        <HeaderPage
          pageTitle={getCurrentPage(pathname)}
          role={getCurrentRole(pathname)}
        />

        <Space h={50} />

        <TableLayout
          layoutTitle={`${milestones?.data?.length} Milestone`}
          addUrl="/add-milestone"
          icon={<ICMilestone width={30} height={30} />}
        >
          {!isMilestoneAvaiable ? (
            <Box className="flex justify-center">
              <NoDataCard
                icon={<ICMilestone width={50} height={50} />}
                description="Untuk mengetahui checkpoint dari task yang telah dikerjakan harap tambahkan milestone terlebih dahulu"
                title="Milestones"
              >
                <ButtonNavigate
                  icon={<IconPlus />}
                  url={`/${getCurrentPage(pathname)}/add-milestone`}
                >
                  Tambah Milestone
                </ButtonNavigate>
              </NoDataCard>
            </Box>
          ) : (
            <>
              <Table
                tableHead={tableHead}
                tableRow={milestones?.data?.map((milestone: any) => {
                  return (
                    <tr key={milestone.id} className="">
                      <td className="md:w-1/6  ">{`${milestone.milestoneName}`}</td>

                      <td className=" ">
                        <Group position="left">
                          <ActionIcon
                            variant="outline"
                            radius={'xl'}
                            color={'red'}
                            c={COLORS.DANGER}
                            opacity={'0.7'}
                            size={'lg'}
                            onClick={() => handleConfirm(milestone.id)}
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
                            // onClick={() => {
                            //   replace(`/admin/payroll-management/${user.id}/edit-user`);
                            // }}
                          >
                            <IconPencilCode size={'1.125rem'} />
                          </ActionIcon>
                        </Group>
                      </td>
                    </tr>
                  );
                })}
              />

              <Space h={30} />

              <div className="flex justify-center ">
                <Pagination total={10} />
              </div>
            </>
          )}
        </TableLayout>
      </Container>
    </MainLayout>
  );
};

export default MilestonePages;
