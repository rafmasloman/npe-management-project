import { Group, List, NavLink, Text, rem } from '@mantine/core';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import KartjisLogo from '@/src/assets/illustration/kartjis.png';
interface INavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const NavItem = ({ label, href, icon }: INavItem) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <NavLink
        mb={30}
        label={label}
        icon={icon}
        variant="filled"
        styles={{
          label: { fontSize: rem(16) },
        }}
      />
      {/* <Group spacing={'xl'}>
          {icon}
          <Text color="black" fw={400}>
            {label}
          </Text>
        </Group> */}
      {/* </NavLink> */}
    </Link>
  );
};

export default NavItem;
