import {
  ActionIcon,
  Grid,
  Group,
  ScrollArea,
  Stack,
  TextInput,
} from '@mantine/core';
import { useGetCommentByTask } from '../hooks/comment/useGetCommentByTask';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user-credential.context';
import CommentChat from '../components/chat/comment-chat.component';
import { useForm } from '@mantine/form';
import { usePostComment } from '../hooks/comment/usePostComment';
import { IconSend } from '@tabler/icons-react';
import { io } from 'socket.io-client';
import { initializingSocket } from '../utils/socket.util';

interface ICommentChatTypesProps {
  taskId: number;
}

const CommentLayout = ({ taskId }: ICommentChatTypesProps) => {
  const { data: commentData, isSuccess } = useGetCommentByTask(Number(taskId));
  // const { mutate, isPending } = usePostComment(taskId);

  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState<any>([]);

  const userAccount = useContext(UserContext);

  const commentForm = useForm({
    initialValues: {
      message: '',
    },
  });

  const socket = initializingSocket();

  const handleSubmitCommentMessage = commentForm.onSubmit((values) => {
    const payload = {
      message: values.message,
      userId: userAccount!.user!.id,
      taskId: taskId!.toString(),
    };

    // mutate(payload);

    socket.emit('message', payload);
  });

  // useEffect(() => {
  //   setMessageData(commentData?.data);
  // }, [commentData, isSuccess]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setMessageData(commentData?.data);

    socket.on('message', (data) => {
      console.log('message : ', [data]);

      setMessageData((prevMessage: any) => [...prevMessage, data]);
    });
  }, [messageData]);

  console.log('broadcast message : ', commentData);

  return (
    <>
      <div className="flex flex-col relative  h-[600px] justify-between">
        <ScrollArea h={'90%'}>
          <Stack>
            {messageData?.map((comment: any) => {
              return (
                <Group
                  key={comment.id}
                  position={
                    userAccount.user?.id! === comment.userId ? 'right' : 'left'
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
    </>
  );
};

export default CommentLayout;
