import { COLORS } from '@/src/constant/colors.constant';
import { Avatar, Card, Group, Progress, Stack, Text } from '@mantine/core';
import Image from 'next/image';

interface IMilestoneCardProps {
  title: string;
  description: string;
}

const MilestoneCard = ({ title, description }: IMilestoneCardProps) => {
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
      <Group w={'100%'}>
        <Stack spacing={'xs'}>
          <Text>{title}</Text>
          <Text color={COLORS.GRAY} fz={'0.875rem'} w={'60%'}>
            {description}
          </Text>
        </Stack>

        <Group style={{ position: 'absolute', right: 50 }}>
          <Avatar style={{ zIndex: 3 }} radius={'xl'} size={30} />
          <Avatar
            style={{ position: 'absolute', left: 16, zIndex: 2 }}
            radius={'xl'}
            size={30}
          />
          <Avatar
            style={{ position: 'absolute', left: 32, zIndex: 1 }}
            radius={'xl'}
            size={30}
          />
        </Group>
      </Group>
    </Card>
  );
};

export default MilestoneCard;
