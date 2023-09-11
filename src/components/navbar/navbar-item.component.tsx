import { Group, List, Text } from '@mantine/core';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface INavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const NavItem = ({ label, href, icon }: INavItem) => {
  return (
    <Link href={href}>
      <List.Item mb={40}>
        <Group spacing={'xl'}>
          {icon}
          <Text color="black" fw={400}>
            {label}
          </Text>
        </Group>
      </List.Item>
    </Link>
  );
};

export default NavItem;
