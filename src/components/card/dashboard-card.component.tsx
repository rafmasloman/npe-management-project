import { Card, Group, Stack, Text, Image } from '@mantine/core';
// import Image from 'next/image';
import ILDailyTask from '@/src/assets/illustration/daily-task-management.png';
import { COLORS } from '@/src/constant/colors.constant';

interface IDashboardCad {
  name: string;
}

const DashboardCard = ({ name }: IDashboardCad) => {
  return (
    <Card
      className="w-full"
      p={25}
      bg={COLORS.PRIMARY}
      radius={'lg'}
      shadow="md"
    >
      <Group>
        <Image
          src={ILDailyTask.src}
          alt="Daily Task management Illustrations"
          width={150}
          height={150}
        />
        <>
          <Text fz={'1.25rem'} fw={500} color="white">
            Hi, {name}
          </Text>
          <Text fz={'1.25rem'} color="white" mt={5}>
            You can easily manage your <br /> projects and teams with us
          </Text>
        </>
      </Group>
    </Card>
  );
};

export default DashboardCard;
