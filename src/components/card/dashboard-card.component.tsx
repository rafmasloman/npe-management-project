import { Card, Group, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import ILDailyTask from '@/src/assets/illustration/daily-task-management.png';
import { COLORS } from '@/src/constant/colors.constant';

interface IDashboardCad {
  name: string;
}

const DashboardCard = ({ name }: IDashboardCad) => {
  return (
    <Card w={600} p={25} bg={COLORS.PRIMARY} radius={'lg'} shadow="md">
      <Group>
        <Image
          src={ILDailyTask.src}
          alt="Daily Task management Illustrations"
          width={120}
          height={120}
          quality={100}
        />
        <Stack>
          <Text fz={'0.875rem'} color="white">
            Hi, {name}
          </Text>
          <Text fz={'1.25rem'} color="white">
            You can easily manage your <br /> projects and teams with us
          </Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default DashboardCard;
