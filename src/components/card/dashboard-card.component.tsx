import { Card, Group, Stack, Text, Image } from '@mantine/core';
// import Image from 'next/image';
import ILDailyTask from '@/src/assets/illustration/daily-task-management.png';
import { COLORS } from '@/src/constant/colors.constant';
import { ICHand } from '@/src/assets/icons/hand.icon';

interface IDashboardCad {
  name: string;
}

const DashboardCard = ({ name }: IDashboardCad) => {
  return (
    <Card
      className="w-full h-full"
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
        <div>
          <Group spacing={7} align="flex-start">
            <Text fz={'1.25rem'} fw={500} color="white">
              Hi, {name}
            </Text>
            <ICHand width={25} height={25} />
          </Group>
          <Text fz={'1.25rem'} color="white" mt={5}>
            You can easily manage your <br /> projects and teams with us
          </Text>
        </div>
      </Group>
    </Card>
  );
};

export default DashboardCard;
