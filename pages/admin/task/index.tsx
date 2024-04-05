import { ICTask } from '@/src/assets/icons/nav-icon/task.icon';
import SEO from '@/src/components/SEO/seo.component';
import ButtonNavigate from '@/src/components/button/button-link.component';
import NoDataCard from '@/src/components/card/no_data-card.component';
import HeaderPage from '@/src/components/header/header-page.component';
import PageLoading from '@/src/components/loading/page-loading.component';
import ModalAction from '@/src/components/modal/modal-action.component';
import Table from '@/src/components/table/table.component';
import { COLORS } from '@/src/constant/colors.constant';
import { useDeleteTask } from '@/src/hooks/task/useDeleteTaskMutation';
import { useGetAllTaskQuery } from '@/src/hooks/task/useGetAllTaskQuery';
import { IQueryAllResponseTaskData } from '@/src/interfaces/task.interface';
import TableLayout from '@/src/layouts/form/table.layout';
import MainLayout from '@/src/layouts/main.layout';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import useRouteLoader from '@/src/utils/routes.event';
import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Group,
  Space,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencilCode, IconPlus, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TaskPage = () => {
  const { pathname, push } = useRouter();
  const isLoading = useRouteLoader();

  const { data: tasks, isSuccess } = useGetAllTaskQuery();
  const { mutate: deleteTask, isPending } = useDeleteTask();

  const [taskId, setTaskId] = useState('');
  const [taskData, setTaskData] = useState<IQueryAllResponseTaskData[]>([]);

  const [
    openedDeleteConfirmation,
    { open: openModalDelete, close: closeModalDelete },
  ] = useDisclosure(false);

  const tableHead = [
    {
      title: 'No',
    },
    {
      title: 'Task',
    },
    {
      title: 'Status',
    },
    {
      title: 'Priority',
    },
    {
      title: 'Project',
    },
    {
      title: 'Aksi',
    },
  ];

  const openModalConfirmationDelete = (taskId: string) => {
    setTaskId(taskId);

    openModalDelete();
  };

  const handleDeleteTask = () => {
    deleteTask(taskId);

    if (!isPending) {
      closeModalDelete();
    }
  };

  useEffect(() => {
    setTaskData(tasks?.data);
  }, [tasks, isSuccess]);

  if (isLoading) return <PageLoading />;

  return (
    <MainLayout>
      <SEO title="Ngatur Task" description="Task Management" />

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
            onClick={handleDeleteTask}
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
          pageTitle={'Task Management'}
          role={getCurrentRole(pathname)}
        />

        <Space h={50} />

        <TableLayout
          layoutTitle={`${
            isSuccess ? `${tasks?.data?.length} Task` : 'Loading...'
          } `}
          addUrl="add-task"
          icon={<ICTask width={30} height={30} />}
        >
          {tasks?.data?.length <= 0 ? (
            <div className="flex  w-full justify-center mt-[70px]">
              <NoDataCard
                icon={<ICTask width={50} height={50} />}
                description="Untuk mengetahui tugas pada project silahkan tambahkan task terlebih dulu"
                title="Tasks"
              >
                <ButtonNavigate
                  icon={<IconPlus />}
                  url={`/admin/task/add-task`}
                >
                  Tambah Task
                </ButtonNavigate>
              </NoDataCard>
            </div>
          ) : (
            <div className="px-8 overflow-x-scroll lg:overflow-x-hidden">
              <Table
                tableHead={tableHead}
                tableRow={taskData?.map(
                  (task: IQueryAllResponseTaskData, index: number) => {
                    return (
                      <tr key={task.id} className="">
                        <td className="">{`${index + 1}`}</td>

                        <td className="">{`${task.name} `}</td>
                        <td className="">{`${task.status} `}</td>
                        <td className="">{`${task.priority} `}</td>
                        <td className="">
                          <Group spacing={5}>
                            <Avatar
                              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${task.project.projectIcon}`}
                              className="h-fit"
                              size={'xs'}
                            />
                            <Text>{task.project.projectName}</Text>
                          </Group>
                        </td>

                        <td className=" ">
                          <Group
                            position="left"
                            className="w-full "
                            spacing={10}
                          >
                            <ActionIcon
                              variant="outline"
                              radius={'xl'}
                              color={'red'}
                              c={COLORS.DANGER}
                              opacity={'0.7'}
                              size={'lg'}
                              onClick={() =>
                                openModalConfirmationDelete(task.id.toString())
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
                                push(`/task/${task.id}/edit-task`);
                              }}
                            >
                              <IconPencilCode size={'1rem'} />
                            </ActionIcon>
                          </Group>
                        </td>
                      </tr>
                    );
                  },
                )}
              />
            </div>
          )}
        </TableLayout>
      </Container>
    </MainLayout>
  );
};

export default TaskPage;
