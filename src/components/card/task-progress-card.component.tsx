import { Card, Group, Progress, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import KartjisLogo from '@/src/assets/illustration/kartjis.png';
import { COLORS } from '@/src/constant/colors.constant';

interface ITaskProgressProps {
  title: string;
  projectName: string;
  progressValue?: number;
  projectIcon: string;
}
const TaskProgress = ({
  title,
  progressValue,
  projectName,
  projectIcon,
}: ITaskProgressProps) => {
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
        <Stack className="w-full">
          <div className="w-8/12 ">
            <Text>{title}</Text>
          </div>
          <Group>
            <Image
              src={`${
                process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL
              }/projects/${projectIcon!}`}
              alt={KartjisLogo.blurDataURL!}
              width={25}
              height={25}
            />
            <Text fz={'0.875rem'} fw={700}>
              {projectName}
            </Text>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};

export default TaskProgress;
