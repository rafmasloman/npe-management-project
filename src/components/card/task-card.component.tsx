import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Drawer,
  Grid,
  Group,
  Menu,
  Modal,
  ScrollArea,
  Space,
  Stack,
  Text,
  TextInput,
  Tooltip,
  rem,
} from '@mantine/core';
import {
  IconClockCheck,
  IconDots,
  IconMessage,
  IconPencil,
  IconSend,
} from '@tabler/icons-react';
import MenuComp from '../menu/menu.component';
import { COLORS } from '@/src/constant/colors.constant';
import { useContext, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useGetCommentByTask } from '@/src/hooks/comment/useGetCommentByTask';
import { useDisclosure } from '@mantine/hooks';
import CommentChat from '../chat/comment-chat.component';
import { UserContext } from '@/src/context/user-credential.context';
import { usePostComment } from '@/src/hooks/comment/usePostComment';
import { useForm } from '@mantine/form';
import { countingDeadline, formattedDate } from '@/src/utils/date.util';
import ActionMenu from '../menu/action-menu.component';
import { IconTrash } from '@tabler/icons-react';
import { useDeleteTask } from '@/src/hooks/task/useDeleteTaskMutation';
import ModalAction from '../modal/modal-action.component';
import TaskForm from '../form/task.form.component';

interface ITaskCardProps {
  id?: string;
  member: IMemberTaskCardProps[];
  text: string;
  deadline: string;
  badgeStyles?: {
    color: string;
    backgroundColor: string;
  };
  comment?: any;
  status: string;
}

interface IMemberTaskCardProps {
  id?: number;
  position: string;
  profilePicture?: string;
  user: IUserMemberTaskCardProps;
}

interface IUserMemberTaskCardProps {
  fullname: string;
}

const TaskCard = ({
  id,
  member,
  text,
  deadline,
  badgeStyles,
  comment,
  status,
}: ITaskCardProps) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'task',

    item: { id, text, status },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [taskId, setTaskId] = useState<number | null>(null);
  const [isProjectMenuOpen, setProjectMenuOpen] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const [openedConfirmation, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const [openedModalEdit, { open: openedEdit, close: closeEdit }] =
    useDisclosure(false);

  const { data: commentData } = useGetCommentByTask(Number(id!));
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate } = usePostComment(Number(id!));

  const userAccount = useContext(UserContext);

  const commentForm = useForm({
    initialValues: {
      message: '',
    },
  });

  const handleOpenDrawer = () => {
    setTaskId(Number(id!));

    open();
  };

  const handleDeleteTask = () => {
    deleteTask(id!);

    close();
  };

  const openModalTaskForm = () => {
    openedEdit();
  };

  const openModalConfirmationDelete = () => {
    openModal();
  };

  const handleSubmitCommentMessage = commentForm.onSubmit((values) => {
    const payload = {
      message: values.message,
      userId: userAccount!.user!.id,
      taskId: taskId!.toString(),
    };

    mutate(payload);
  });

  return (
    <Card
      radius={'md'}
      shadow="md"
      withBorder
      ref={dragRef}
      className={`${
        isDragging ? 'opacity-40 ' : 'opacity-100 '
      } w-full cursor-grab`}
    >
      <ModalAction
        headerText="Hapus Data Task?"
        message="Data yang telah dihapus tidak dapat dikembalikan"
        type="delete"
        opened={openedConfirmation}
        close={closeModal}
      >
        <Group mt={20}>
          <Button
            variant=""
            onClick={() => handleDeleteTask()}
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

      <Modal
        opened={openedModalEdit}
        onClose={closeEdit}
        radius={'lg'}
        padding={25}
        title="Edit Task"
        size={'md'}
        styles={{
          title: {
            width: '100%',
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: 600,
          },
        }}
      >
        <TaskForm />
      </Modal>

      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Stack spacing={3}>
            <Text className="text-sm text-gray-500 font-medium">
              Task Comment Section
            </Text>
            <Text>{text}</Text>
          </Stack>
        }
        position="right"
        styles={{
          content: {
            backgroundColor: '#E7F1FF',
          },
          header: {
            backgroundColor: 'white',
            borderBottom: 'solid',
            borderBottomWidth: 1,
            borderColor: COLORS.GRAY,
            marginBottom: 20,
          },
          root: {
            backgroundColor: 'red',
          },
        }}
      >
        <div className="flex flex-col relative  h-[600px] justify-between">
          <ScrollArea h={'90%'}>
            <Stack>
              {commentData?.data?.map((comment: any) => {
                return (
                  <Group
                    key={comment.id}
                    position={
                      userAccount.user?.id! === comment.userId
                        ? 'right'
                        : 'left'
                    }
                  >
                    <CommentChat
                      userId={comment.userId}
                      message={comment.message}
                      createdAt={comment.createdAt}
                      user={comment.user}
                    />
                  </Group>
                );
              })}
            </Stack>
          </ScrollArea>

          <form
            className="w-full  absolute bottom-0"
            onSubmit={handleSubmitCommentMessage}
          >
            <Grid className="w-full" align="center">
              <Grid.Col span={11}>
                <TextInput
                  placeholder="Tulis Pesan..."
                  {...commentForm.getInputProps('message')}
                  styles={{
                    input: {
                      height: '100%',
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <ActionIcon
                  type="submit"
                  variant="filled"
                  size={32}
                  radius={'sm'}
                  className="bg-primary"
                >
                  <IconSend size={20} className=" h-full " color="white" />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          </form>
        </div>
      </Drawer>

      {/* <Group position={'apart'}>
        <ActionIcon color={COLORS.GRAY}>
          <IconDots color={COLORS.GRAY} />
        </ActionIcon>
      </Group> */}

      <Group position="apart">
        <ActionMenu
          position="right"
          opened={isProjectMenuOpen}
          setOpened={setProjectMenuOpen}
        >
          <Menu.Item
            icon={<IconTrash size={14} color={COLORS.DANGER} />}
            className="text-red-500 text-sm"
            onClick={openModalConfirmationDelete}
          >
            Hapus
          </Menu.Item>

          <Menu.Item
            icon={<IconPencil size={14} color={COLORS.SECONDARY} />}
            className="text-blue-950 text-sm"
            component="a"
            // href={`/project/edit-project/${id}`}
            onClick={openModalTaskForm}
          >
            Edit
          </Menu.Item>
        </ActionMenu>
      </Group>

      <Space h={rem(16)} />

      <Group>
        <Text fw={500}>{text}</Text>
      </Group>

      <Space h={rem(10)} />

      <Group position="apart">
        <Group spacing="xs">
          <Group spacing={5}>
            <IconClockCheck size={rem(14)} color={COLORS.DANGER} />
            <Text fz={rem(12)}>{countingDeadline(deadline)}</Text>
          </Group>

          <Group spacing={5} onClick={handleOpenDrawer}>
            <IconMessage
              size={rem(14)}
              className="text-gray-400 hover:text-primary cursor-pointer"
            />
            <Text fz={rem(12)} c={COLORS.GRAY}>
              {commentData?.data?.length}
            </Text>
          </Group>
        </Group>
        <Avatar.Group className="cursor-default">
          {member.map((m) => {
            return (
              <Tooltip
                key={m.user?.fullname}
                label={m.user?.fullname}
                withArrow
                color={COLORS.LIGHTBLUE}
                styles={{
                  tooltip: {
                    color: COLORS.DEEPBLUE,
                    fontWeight: 600,
                  },
                }}
              >
                <Avatar
                  radius={'xl'}
                  src={`${
                    process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL
                  }/members/${m.profilePicture!}`}
                  size={30}
                />
              </Tooltip>
            );
          })}
        </Avatar.Group>
      </Group>
    </Card>
  );
};

export default TaskCard;
