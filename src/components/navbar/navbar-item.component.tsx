import { Flex, Group, List, NavLink, Text, rem } from '@mantine/core';
import Link from 'next/link';
import React, { ReactNode, useContext } from 'react';
import KartjisLogo from '@/src/assets/illustration/kartjis.png';
import { useRouter } from 'next/router';
import { useAuth } from '@/src/hooks/useAuth';
import { UserContext } from '@/src/context/user-credential.context';
interface INavItem {
  label: string;
  href: string;
  icon?: ReactNode;
  isActive?: boolean;
  isNestedNav?: boolean;
  children?: ReactNode;
}

const NavItem = ({
  label,
  href,
  icon,
  isActive,
  isNestedNav,
  children,
}: INavItem) => {
  const { pathname } = useRouter();

  const isActiveNav = pathname.includes(label.toLowerCase()) ? true : false;

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Flex align={'center'}>
        <NavLink
          label={label}
          icon={icon}
          variant="filled"
          styles={{
            label: { fontSize: rem(16) },
          }}
        >
          {!href ? null : children}
        </NavLink>
        {isActiveNav ? (
          <div className="bg-yellow h-10 w-1.5 rounded-tl-md rounded-bl-md"></div>
        ) : null}
      </Flex>
    </Link>
  );
};

export default NavItem;
