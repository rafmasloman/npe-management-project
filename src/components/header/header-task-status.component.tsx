import { Box, Group, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface IHeaderStatusProps {
  text: string;
  icon: ReactNode;
}

const HeaderStatus = ({ text, icon, ...props }: IHeaderStatusProps) => {
  return (
    <Group {...props}>
      {icon}
      <Text fz={'1.125rem'} fw={600}>
        {text}
      </Text>
    </Group>
  );
};

export default HeaderStatus;
