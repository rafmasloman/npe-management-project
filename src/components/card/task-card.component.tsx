import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Drawer,
  Grid,
  Group,
  Menu,
  Modal,
  ScrollArea,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  Tooltip,
  rem,
} from '@mantine/core';
import {
  IconArrowDown,
  IconCircle,
  IconCircleFilled,
  IconClockCheck,
  IconDots,
  IconMessage,
  IconPencil,
  IconSend,
} from '@tabler/icons-react';
import MenuComp from '../menu/menu.component';
import { COLORS } from '@/src/constant/colors.constant';
import { useContext, useEffect, useState } from 'react';
import { useDrag, useDragLayer } from 'react-dnd';
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
import { useDragItem } from '@/src/hooks/common/drag/useDragTask';
import CommentLayout from '@/src/layouts/comment.layout';
import { TODO_UTILS } from '@/src/utils/todo.util';
import TaskStatusMenu from '../menu/task-status-menu.component';

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
  priority: string;
}

interface IMemberTaskCardProps {
  id?: number;
  position: string;
  profilePicture?: string;
  user: IUserMemberTaskCardProps;
}

interface IUserMemberTaskCardProps {
  firstname: string;
  lastname: string;
}

const TaskCard = ({
  id,
  member,
  text,
  deadline,
  badgeStyles,
  comment,
  status,
  priority,
}: ITaskCardProps) => {
  const { item, itemType, isDraggingLayer, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      isDraggingLayer: monitor.isDragging(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
    }));

  // const [{ isDragging }, dragRef] = useDrag(() => ({
  //   type: 'task',

  //   item: { id, text, status },

  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));

  const { isDragging, dragRef } = useDragItem('task', { id, text, status });

  const [taskId, setTaskId] = useState<number | null>(null);
  const [isProjectMenuOpen, setProjectMenuOpen] = useState(false);
  const [statusColor, setStatusColor] = useState('');

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

  useEffect(() => {
    setStatusColor(TODO_UTILS.STATUS_COLOR(status)!);
  }, [status]);

  return (
    <Card
      radius={'md'}
      // shadow="md"
      // withBorder
      ref={dragRef}
      bg={'dark'}
      className={`${
        isDragging
          ? 'opacity-50 border-dashed border-2 border-gray-500 cursor-move sacle'
          : 'opacity-100 bg-opacity-100 text-opacity-100 border-solid border-2 border-white'
      } w-full h-fit bg-white `}
      style={{
        backfaceVisibility: 'hidden',
      }}
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
        }}
      >
        <CommentLayout taskId={taskId!} />
      </Drawer>

      <Group position="apart" className="w-full">
        <Group>
          <Badge
            color={
              priority?.toLowerCase().includes('High'.toLowerCase())
                ? 'red'
                : priority?.toLowerCase().includes('Medium'.toLowerCase())
                ? 'orange'
                : 'indigo'
            }
          >
            {priority?.charAt(0).toUpperCase()! +
              priority?.slice(1).toLowerCase()!}
          </Badge>
        </Group>

        <Group position="apart" className="cursor-default" bg={'white'}>
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
      </Group>

      <Space h={rem(16)} />

      <Group className="w-fit">
        <Text fw={500}>{text}</Text>
      </Group>

      <Space h={rem(16)} />

      <Avatar.Group className="cursor-default">
        {member.map((m, index) => {
          return (
            <Tooltip
              key={index}
              label={`${m.user?.firstname} ${m.user?.lastname}`}
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
                size={27}
              />
            </Tooltip>
          );
        })}
      </Avatar.Group>

      <Divider className="my-3.5" />

      <Group position="apart" className="w-full">
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

        {/* <Group spacing={5} align="center">
          <IconCircleFilled
            className={`w-2.5 h-2.5 text-[${TODO_UTILS.STATUS_COLOR(
              status,
            )!}] `}
          />

          <p className="text-sm">Status</p>
        </Group> */}

        <TaskStatusMenu id={Number(id)!} />
      </Group>
    </Card>
  );
};

export default TaskCard;
