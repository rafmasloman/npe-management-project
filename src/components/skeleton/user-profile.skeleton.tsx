import { Group, Skeleton, Stack } from '@mantine/core';

const UserProfileSkeleton = () => {
  return (
    <Group>
      <Skeleton height={30} circle />
      <Stack spacing={5}>
        <Skeleton width={100} height={8} radius={'lg'} />
        <Skeleton width={100} height={8} radius={'lg'} />
      </Stack>
    </Group>
  );
};

export default UserProfileSkeleton;
