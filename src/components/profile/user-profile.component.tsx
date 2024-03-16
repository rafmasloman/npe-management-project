import { forwardRef } from 'react';
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  Stack,
  TextInput,
  MediaQuery,
  Skeleton,
} from '@mantine/core';
import { IUserProfileBadgeProps } from '@/src/interfaces/user.interface';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const UserProfile = forwardRef<HTMLButtonElement, IUserProfileBadgeProps>(
  (
    {
      name,
      role,
      profilePicture,
      isSuccess,
      ...others
    }: IUserProfileBadgeProps,
    ref,
  ) => (
    <UnstyledButton ref={ref} {...others}>
      <Group>
        <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
          <Group>
            <Avatar
              radius="xl"
              size={'md'}
              src={
                !!profilePicture
                  ? `${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${profilePicture}`
                  : ''
              }
            />

            <Stack spacing={0}>
              <Text>{name}</Text>
              <Text>{role}</Text>
            </Stack>
          </Group>
        </MediaQuery>

        <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
          <Group>
            <Avatar
              radius="xl"
              size={'md'}
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${profilePicture}`}
            />
            <Stack spacing={0}>
              <Text fz={'0.825rem'}>{name}</Text>
              <Text fz={'0.825rem'}>{role}</Text>
            </Stack>
          </Group>
        </MediaQuery>

        {/* <Group>
          <Avatar radius="xl" size={'lg'} />
          <Stack gap={0}>
            <Text>{name}</Text>
            <Text>{role}</Text>
          </Stack>
        </Group> */}

        {/* <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <TextInput size="xl" />
        </MediaQuery>

        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <TextInput size="md" />
        </MediaQuery> */}
      </Group>
    </UnstyledButton>
  ),
);

export default UserProfile;
