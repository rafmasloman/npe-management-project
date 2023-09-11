import { Card, Group, Progress, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import KartjisLogo from '@/src/assets/illustration/kartjis.png';
import { COLORS } from '@/src/constant/colors.constant';

interface ITaskCardProps {
  title: string;
  projectName: string;
  progressValue: number;
}
const TaskCard = ({ title, progressValue, projectName }: ITaskCardProps) => {
  return (
    <Card
      w={'100%'}
      radius={'md'}
      style={{
        borderStyle: 'solid',
        borderWidth: '0 0 0 10px',
        borderColor: COLORS.SECONDARY,
      }}
    >
      <Group position="apart">
        <Stack>
          <Text>{title}</Text>
          <Group>
            <Image
              src={KartjisLogo.src}
              alt={KartjisLogo.blurDataURL!}
              width={25}
              height={25}
            />
            <Text fz={'0.875rem'} fw={700}>
              {projectName}
            </Text>
          </Group>
        </Stack>

        <Stack>
          <Group position="apart">
            <Text fw={600} fz={'0.75rem'} color={COLORS.PRIMARY}>
              Progress
            </Text>
            <Text fw={600} fz={'0.75rem'} color={COLORS.PRIMARY}>
              {progressValue}%
            </Text>
          </Group>
          <Progress
            w={250}
            value={progressValue}
            label={progressValue.toString()!}
            size="lg"
            radius="xl"
          />
        </Stack>
      </Group>
    </Card>
  );
};

export default TaskCard;
