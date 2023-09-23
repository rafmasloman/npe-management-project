import { Group, Menu, Text } from '@mantine/core';
import MenuComp from '../menu/menu.component';
import UserProfile from '../profile/user-profile.component';
import { useMediaQuery } from '@mantine/hooks';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';

interface IHeaderPageProps {
  pageTitle: string;
  role: string;
}

const HeaderPage = ({ pageTitle, role }: IHeaderPageProps) => {
  const largeScreen = useMediaQuery('(min-width: 60em)');
  const { replace } = useRouter();

  const firstLetterToUpperCase = (text: string) => {
    const newText =
      text.split('')[0].toUpperCase() + pageTitle.slice(1, pageTitle.length);
    return newText;
  };

  function handleLogout() {
    replace(ROUTES.LOGIN);
  }

  return (
    <Group position="apart" px={largeScreen ? 50 : '1rem'} mt={25} w={'100%'}>
      <Text fw={600} fz={largeScreen ? '1.25rem' : '1rem'}>
        {firstLetterToUpperCase(pageTitle)}
      </Text>
      <MenuComp button={<UserProfile name="Rafly Masloman" role={role} />}>
        <Menu.Item icon={<IconUser size={14} />} style={{ width: '180px' }}>
          Profile
        </Menu.Item>
        <Menu.Item onClick={handleLogout} icon={<IconLogout size={14} />}>
          Logout
        </Menu.Item>
      </MenuComp>
    </Group>
  );
};

export default HeaderPage;
