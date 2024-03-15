import { COLORS } from '@/src/constant/colors.constant';
import { Avatar, Card, Group, Progress, Stack, Text } from '@mantine/core';
import Image from 'next/image';

interface IMilestoneCardProps {
  title: string;
  description: string;
  projectIcon: string;
  projectName: string;
}

const MilestoneCard = ({
  title,
  description,
  projectIcon,
  projectName,
}: IMilestoneCardProps) => {
  return (
    <Card
      style={{
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: '0 0 0 10px',
        borderColor: COLORS.THIRD,
      }}
      w={'100%'}
      pl={24}
      pr={16}
      py={16}
    >
      <Group w={'100%'} position="apart">
        <Stack spacing={'xs'}>
          <Text>{title}</Text>
          <Text color={COLORS.GRAY} fz={'0.875rem'}>
            {description}
          </Text>
        </Stack>

        <Stack spacing={10} align="end">
          <Group align="center" spacing={7}>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${projectIcon}`}
              size={20}
              className="h-fit"
            />
            <Text className="text-sm">{projectName}</Text>
          </Group>
          <Avatar style={{ zIndex: 3 }} radius={'xl'} size={30} />
        </Stack>
      </Group>
    </Card>
  );
};

export default MilestoneCard;
