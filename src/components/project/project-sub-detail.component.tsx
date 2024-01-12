import { COLORS } from '@/src/constant/colors.constant';
import { Box, Group, Space, Stack, Text } from '@mantine/core';

interface ISubDetailProps {
  title: string;
  children: React.ReactNode;
}
const SubDetail = ({ title, children }: ISubDetailProps) => {
  return (
    <Group>
      <Text
        color={COLORS.GRAY}
        fw={500}
        w={'100px'}
        className="text-sm md:text-base"
      >
        {title}
      </Text>

      <Space w={100} />
      <Group>{children}</Group>
    </Group>
  );
};

export default SubDetail;
