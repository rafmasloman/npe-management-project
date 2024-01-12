import { navbarMainLink } from '@/src/utils/navbar.utils';
import { Group, Space } from '@mantine/core';
import NavItem from './navbar-item.component';

const NavbarMainList = () => {
  return (
    <Group>
      {navbarMainLink.map((navItem) => {
        return (
          <NavItem key={navItem.id} label={navItem.label} href={navItem.href} />
        );
      })}
    </Group>
  );
};

export default NavbarMainList;
