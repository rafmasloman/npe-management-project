import { Menu, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';

interface IMenuProps {
  button?: any;
}

const MenuComp = ({ button }: IMenuProps) => {
  const { replace } = useRouter();

  function handleLogout() {
    replace(ROUTES.LOGIN);
  }

  return (
    <Menu>
      <Menu.Target>{button}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconUser size={14} />} style={{ width: '180px' }}>
          Profile
        </Menu.Item>
        <Menu.Item onClick={handleLogout} icon={<IconLogout size={14} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuComp;
