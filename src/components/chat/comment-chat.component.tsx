import { UserContext } from '@/src/context/user-credential.context';
import { useGetCommentById } from '@/src/hooks/comment/useGetCommentById';
import { useAuth } from '@/src/hooks/useAuth';
import { Avatar, Grid, Group, Stack, Text } from '@mantine/core';
import { useContext } from 'react';

interface ICommentChatProps {
  userId: string;
  message: string;
  createdAt: string;
  user: IUserCommentChatProps;
}

interface IUserCommentChatProps {
  firstname: string;
  lastname: string;
  member: IMemberCommentChatProps;
}

interface IMemberCommentChatProps {
  position: string;
  profilePicture?: string;
}

const CommentChat = ({
  message,
  user,
  createdAt,
  userId,
}: ICommentChatProps) => {
  const inputDate = new Date(createdAt);

  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();

  const sendTime = `${String(hours).padStart(2, '0')}:${String(
    minutes,
  ).padStart(2, '0')}`;

  const userAccount = useContext(UserContext);

  return (
    <Group bg={'white'} p={10} className="rounded-lg w-3/4">
      <Avatar
        src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${user?.member?.profilePicture}`}
        size={30}
        radius={'xl'}
      />

      <div className="flex justify-between items-end flex-1">
        <div>
          <Text className="text-sm text-gray-500">
            {userAccount?.user?.id! === userId
              ? 'You'
              : `${user?.firstname} ${user?.lastname}`}
          </Text>
          <Text className="text-[0.875rem]">{message}</Text>
        </div>

        <Text className="text-[0.625rem] text-gray-500">{sendTime}</Text>
      </div>
    </Group>
  );
};

export default CommentChat;
