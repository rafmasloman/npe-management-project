import { navbarLink } from '@/src/utils/navbar.utils';
import { Anchor, Image, List } from '@mantine/core';
import NavItem from './navbar-item.component';
import { IconInterfaceProps } from '@/src/interfaces/icon.interface';

interface INavList {
  id: number;
  label: string;
  href: string;
  icon: React.FC<any>;
}

const NavList = () => {
  return (
    <List style={{ textDecoration: 'none', listStyle: 'none' }}>
      {navbarLink.map(({ id, label, icon: Icon, href }: INavList) => {
        return (
          <NavItem
            label={label}
            key={id}
            href={href}
            icon={<Icon width={20} height={20} />}
          />
        );
      })}
    </List>
  );
};

export default NavList;
