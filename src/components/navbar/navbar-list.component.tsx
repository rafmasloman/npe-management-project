import { navbarLink } from '@/src/utils/navbar.utils';
import {
  Anchor,
  Divider,
  Image,
  List,
  NavLink,
  Space,
  Stack,
  rem,
} from '@mantine/core';
import NavItem from './navbar-item.component';
import { IconInterfaceProps } from '@/src/interfaces/icon.interface';
import { IconFileStack } from '@tabler/icons-react';
import { COLORS } from '@/src/constant/colors.constant';
import NPEProLogo from '@/src/assets/images/npe_pm_logo.png';
import Link from 'next/link';

interface INavList {
  id: number;
  label: string;
  href: string;
  icon: React.FC<any>;
}

const NavList = () => {
  return (
    <Stack style={{ textDecoration: 'none', listStyle: 'none' }} spacing={'xs'}>
      {navbarLink.map(({ id, label, icon: Icon, href }: INavList) => {
        return (
          <>
            <NavItem
              label={label}
              key={id}
              href={href}
              icon={<Icon width={25} height={25} />}
            />
            <Space h={20} />
          </>
        );
      })}

      <Divider ml={-30} />
      <NavLink
        label={'Workspace'}
        icon={<IconFileStack width={25} height={25} color={COLORS.DEEPBLUE} />}
        defaultOpened
        styles={{
          label: { fontSize: rem(16) },
        }}
      >
        <Link
          href={'/admin/project/1/detail'}
          style={{ textDecoration: 'none' }}
        >
          <NavLink label="Kartjis" />
        </Link>
      </NavLink>
    </Stack>
  );
};

export default NavList;
