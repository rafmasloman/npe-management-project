import { COLORS } from '@/src/constant/colors.constant';
import { Button, Card, Stack, Text } from '@mantine/core';
import React, { ReactNode } from 'react';

interface INoDataCardPropsTypes {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

const NoDataCard = ({
  icon,
  title,
  description,
  children,
}: INoDataCardPropsTypes) => {
  return (
    <Card
      radius={'xl'}
      shadow="sm"
      className="bg-white w-[370px] h-[350px] px-[30px] py-[30px] flex flex-col justify-between items-center"
    >
      <div className="bg-[#D6E7FF] flex justify-center items-center w-fit p-6 rounded-full">
        {icon}
      </div>

      <div className=" flex flex-col items-center justify-center">
        <Text className="font-semibold text-lg"> Oops! Belum ada {title}</Text>
        <Text className="text-gray-400 tracking-wide text-center text-sm mt-2.5">
          {description}
        </Text>
      </div>

      {children}
    </Card>
  );
};

export default NoDataCard;
