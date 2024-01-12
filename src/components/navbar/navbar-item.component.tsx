import { Flex, Group, List, NavLink, Text, rem } from '@mantine/core';
import Link from 'next/link';
import React, { ReactNode, useContext } from 'react';
import KartjisLogo from '@/src/assets/illustration/kartjis.png';
import { useRouter } from 'next/router';
import { useAuth } from '@/src/hooks/useAuth';
interface INavItem {
  label: string;
  href: string;
  icon?: ReactNode;
  isActive?: boolean;
}

const NavItem = ({ label, href, icon, isActive }: INavItem) => {
  const { pathname } = useRouter();

  const isActiveNav = pathname.includes(label.toLowerCase()) ? true : false;

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Flex align={'center'}>
        <NavLink
          // mb={30}
          label={label}
          icon={icon}
          variant="filled"
          styles={{
            label: { fontSize: rem(16) },
          }}
        />
        {isActiveNav ? (
          <div className="bg-yellow h-10 w-1.5 rounded-tl-md rounded-bl-md"></div>
        ) : null}
      </Flex>
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
