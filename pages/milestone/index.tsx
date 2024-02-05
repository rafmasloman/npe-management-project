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
  Button,
  Container,
  Group,
  Loader,
  Pagination,
  SimpleGrid,
  Space,
  Table,
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

const MilestonePages = () => {
  const { pathname, replace } = useRouter();

  const { data: milestones } = useGetAllMilestone();
  const { mutate: deleteMilestone } = useDeleteMilestone();
  const [opened, { open, close }] = useDisclosure(false);

  const [activePage, setPage] = useState(1);
  const [milestoneId, setMilestoneId] = useState('');

  const openModalConfirmationDelete = (milestoneId: string) => {
    setMilestoneId(milestoneId);
    open();
  };

  const handleDeleteMilestone = (milestoneId: string) => {
    deleteMilestone(milestoneId!);

    close();
  };

  const rows = milestones?.data?.map((milestone: any, index: number) => {
    return (
      <tr key={index} className="border-solid border-[1px] border-gray-300">
        <td>{index}</td>
        <td>{milestone.milestoneName}</td>
        <td>
          <div className="flex space-x-2.5 items-center">
            <div
              className={`w-2 h-2 rounded-full ${
                milestone.status.toLowerCase().includes('todo')
                  ? 'bg-blue-950'
                  : milestone.status.toLowerCase().includes('on_progress')
                  ? 'bg-primary'
                  : 'bg-green-600'
              }`}
            ></div>
            <Text>{milestone.status}</Text>
          </div>
        </td>
        <td>{milestone.description}</td>
        {/* <td>
          <Text>{moment(milestone.startedDate).format('DD MMMM YYYY')}</Text>
        </td> */}
        <td>
          <Group spacing={10}>
            <ICDeadline width={16} height={16} />
            {moment(milestone.endDate).format('DD MMMM YYYY')}
          </Group>
        </td>
        <td>
          <div className="flex items-center space-x-2.5">
            <Image
              alt={milestone.project?.projectName}
              width={16}
              height={16}
              quality={100}
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${milestone.project?.projectIcon}`}
            />

            <Text>{milestone.project?.projectName}</Text>
          </div>
        </td>
        <td>{milestone.task?.length}</td>
        <td>
          <Group>
            <ActionIcon
              variant="outline"
              radius={'xl'}
              color={'red'}
              c={COLORS.DANGER}
              opacity={'0.7'}
              size={'lg'}
              onClick={() => {
                openModalConfirmationDelete(milestone.id);
              }}
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
                replace(`/milestone/${milestone.id.toString()}/edit-milestone`);
              }}
            >
              <IconPencilCode size={'1.125rem'} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

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

      <MilestoneLayout pathname={pathname}>
        <Container size={'100%'} px={60}>
          {/* <SimpleGrid cols={3} spacing={40}>
            {!milestones?.data
              ? null
              : milestones.data?.map((milestone: any) => {
                  return (
                    <MilestoneCard
                      key={milestone.id}
                      title={milestone.milestoneName}
                      description=""
                    />
                  );
                })}
          </SimpleGrid> */}

          <Space h={50} />

          <Table className="" verticalSpacing={14}>
            <thead className="">
              <tr className="bg-primary ">
                <th className="rounded-tl-lg ">
                  <Text c={'white'} fw={600}>
                    No.
                  </Text>
                </th>
                <th>
                  <Text c={'white'} fw={600}>
                    {' '}
                    Milestone{' '}
                  </Text>
                </th>
                <th>
                  <Text c={'white'} fw={600}>
                    Status
                  </Text>
                </th>
                <th>
                  <Text c={'white'} fw={600}>
                    Deskripsi
                  </Text>
                </th>
                {/* <th>
                  <Text c={'white'} fw={600}>
                    Tanggal Mulai
                  </Text>
                </th> */}
                <th>
                  <Text c={'white'} fw={600}>
                    Deadline
                  </Text>
                </th>
                <th>
                  <Text c={'white'} fw={600}>
                    Projects
                  </Text>
                </th>
                <th>
                  <Text c={'white'}>Jumlah Task</Text>
                </th>
                <th className="rounded-tr-lg">
                  <Text c={'white'}>Action</Text>
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>

          <Space h={50} />

          <div className="flex justify-center">
            <Pagination
              value={activePage}
              onChange={setPage}
              total={milestones?.data?.length / 10}
            />
          </div>
        </Container>
      </MilestoneLayout>
    </MainLayout>
  );
};

export default MilestonePages;
