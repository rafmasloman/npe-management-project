import { COLORS } from '@/src/constant/colors.constant';
import { Group, Stack, Text } from '@mantine/core';
import React, { ReactNode } from 'react';

type Props = {};

interface IDataCardPropsTypes {
  title: string;
  totalData?: number;
  icon: ReactNode;
  color?: string;
}

const DataCard = ({ title, totalData, icon, color }: IDataCardPropsTypes) => {
  return (
    <Group className="bg-white w-full flex justify-between items-center h-20 p-4">
      <Group className="h-full">
        <Group
          className={`w-1 h-full rounded-3xl`}
          style={{ backgroundColor: color }}
        ></Group>
        <Stack className="h-full " spacing={0}>
          <Text className="text-sm">{title}</Text>
          <Text className="text-3xl">{totalData}</Text>
        </Stack>
      </Group>

      <div className="bg-sky-100 flex justify-center items-center p-2.5  rounded-full">
        {icon}
      </div>
    </Group>
  );
};

export default DataCard;
