import { forwardRef } from 'react';
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  Stack,
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
  ({ name, role, ...others }: IUserProfileBadgeProps, ref) => (
    <UnstyledButton ref={ref} {...others}>
      <Group>
        <Avatar radius="xl" size={'lg'} />
        <Stack spacing={'0'}>
          <Text>{name}</Text>
          <Text>{role}</Text>
        </Stack>
      </Group>
    </UnstyledButton>
  ),
);

export default UserProfile;
