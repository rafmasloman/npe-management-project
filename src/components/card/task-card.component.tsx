import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Drawer,
  Grid,
  Group,
  Menu,
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

interface ITaskCardProps {
  id?: string;
  badge: string;
  member: IMemberTaskCardProps[];
  text: string;
  deadline: string;
  badgeStyles?: {
    color: string;
    backgroundColor: string;
  };
  comment?: any;
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
  badge,
  member,
  text,
  deadline,
  badgeStyles,
  comment,
}: ITaskCardProps) => {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: 'task',
    // item: { text },
    collect: (monitor) => ({
      opacity: !!monitor.isDragging(),
    }),
  }));

  const [taskId, setTaskId] = useState<number | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const { data: commentData } = useGetCommentByTask(Number(id!));

  const userAccount = useContext(UserContext);

  const commentForm = useForm({
    initialValues: {
      message: '',
    },
  });

  const { mutate } = usePostComment(Number(id!));

  const handleOpenDrawer = () => {
    setTaskId(Number(id!));

    open();
  };

  const handleSubmitCommentMessage = commentForm.onSubmit((values) => {
    const payload = {
      message: values.message,
      userId: userAccount!.user!.id,
      taskId: taskId!.toString(),
    };

    mutate(payload);
  });

  console.log('drawer id : ', commentData);
  return (
    <Card radius={'md'} shadow="md" withBorder ref={dragRef}>
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

      <Group position={'apart'}>
        <Badge style={badgeStyles}>{badge}</Badge>

        <ActionIcon color={COLORS.GRAY}>
          <IconDots color={COLORS.GRAY} />
        </ActionIcon>
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
            <Text fz={rem(12)}>{deadline}</Text>
          </Group>

          <Group spacing={5} onClick={handleOpenDrawer}>
            <IconMessage
              size={rem(14)}
              className="text-gray-400 hover:text-primary"
            />
            <Text fz={rem(12)} c={COLORS.GRAY}>
              {commentData?.data?.length}
            </Text>
          </Group>
        </Group>
        <Avatar.Group>
          {member.map((m) => {
            console.log('profile pic : ', m.profilePicture);

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
