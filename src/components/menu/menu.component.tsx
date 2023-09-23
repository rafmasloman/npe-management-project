import { Menu, Text, rem } from '@mantine/core';
import { ReactNode } from 'react';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';

interface IMenuProps {
  button?: any;
  children: ReactNode;
}

const MenuComp = ({ button, children }: IMenuProps) => {
  const { replace } = useRouter();

  return (
    <Menu
      styles={{
        item: {},
      }}
    >
      <Menu.Target>{button}</Menu.Target>

      <Menu.Dropdown>
        {/* <Menu.Item icon={<IconUser size={14} />} style={{ width: '180px' }}>
          Profile
        </Menu.Item>
        <Menu.Item onClick={handleLogout} icon={<IconLogout size={14} />}>
          Logout
        </Menu.Item> */}
        {children}
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuComp;
