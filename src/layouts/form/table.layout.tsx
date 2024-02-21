import ButtonNavigate from '@/src/components/button/button-link.component';
import { getCurrentRole } from '@/src/utils/page.util';
import { Group, Space, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

interface ITableLayoutPropsType {
  children: ReactNode;
  layoutTitle: string;
  addUrl?: string;
  icon?: ReactNode;
}

const TableLayout = ({
  children,
  layoutTitle,
  addUrl,
  icon,
}: ITableLayoutPropsType) => {
  const { pathname } = useRouter();
  return (
    <div className="w-full bg-white py-8 rounded-2xl border border-solid border-gray-200">
      <Group
        align="center"
        position="apart"
        className="border-b-2 border-0 border-solid border-gray-300 px-8 pb-5"
      >
        <Group spacing={20}>
          {icon}
          <Text className="text-blue-950 text-lg font-semibold ">
            {layoutTitle}
          </Text>
        </Group>

        <ButtonNavigate
          icon={<IconPlus />}
          url={`/${getCurrentRole(pathname)}/${addUrl}`}
        >
          Tambah {layoutTitle.split(' ')[1]}
        </ButtonNavigate>
      </Group>

      <Space h={35} />

      {children}
    </div>
  );
};

export default TableLayout;
