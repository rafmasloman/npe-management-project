import {
  Box,
  Button,
  Card,
  Group,
  Menu,
  Modal,
  Text,
  useMantineTheme,
} from '@mantine/core';
import MenuComp from '../menu/menu.component';
import UserProfile from '../profile/user-profile.component';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';
import { useAuth } from '@/src/hooks/useAuth';
import {
  __deleteBrowserCookie,
  __getBrowserAuthCookie,
  __setBrowserAuthCookie,
} from '@/src/utils/cookie.util';

import { deleteCookie } from 'cookies-next';
import { COLORS } from '@/src/constant/colors.constant';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { UserContext } from '@/src/context/user-credential.context';
import { useContext } from 'react';
import ModalAction from '../modal/modal-action.component';

interface IHeaderPageProps {
  userId?: string;
  pageTitle: string;
  role: string;
  onClick?: () => void;
}

const HeaderPage = ({ userId, pageTitle, role, onClick }: IHeaderPageProps) => {
  const [opened, { close, open }] = useDisclosure(false);

  const largeScreen = useMediaQuery('(min-width: 60em)');
  console.log('userId : ', userId);

  // const [opened, { open, close }] = useDisclosure(false);
  // const theme = useMantineTheme();

  // const token = __getBrowserAuthCookie(TOKEN_NAME);

  const user = useContext(UserContext);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const firstLetterToUpperCase = (text?: string) => {
    const newText =
      text?.split('')[0].toUpperCase() + pageTitle.slice(1, pageTitle.length);
    return newText;
  };

  return (
    <Box
      mt={0}
      w={'100%'}
      bg={'white'}
      px={'2rem'}
      py={'1.125rem'}
      className="flex justify-between items-center"
      style={{
        borderRadius: 14,
        borderWidth: 0.5,
        borderStyle: 'solid',
        borderColor: COLORS.DEEPGRAY,
      }}
    >
      <ModalAction
        headerText="Anda ingin keluar?"
        opened={opened}
        close={close}
        message="Jika keluar anda masih bisa login kembali"
        type="confirmation"
      >
        <Group mt={20}>
          <Button
            variant=""
            onClick={handleLogout}
            w={'48%'}
            // loading={isLoading}
            radius={'md'}
            c={'white'}
            bg={COLORS.PRIMARY}
            // disabled={disableNoButton}
          >
            Keluar
          </Button>
          <Button
            // loading={isLoading}
            onClick={close}
            variant="outline"
            w={'48%'}
            radius={'md'}
            c={COLORS.PRIMARY}
            color={COLORS.PRIMARY}
          >
            Batal
          </Button>
        </Group>
      </ModalAction>

      {/* <Modal
        opened={opened}
        onClose={close}
        title="Keluar dari akun"
        overlayProps={{
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Group position="center" spacing={'xl'}>
          <Button
            variant="outline"
            onClick={onClick}
            w={'180px'}
            // loading={isLoading}
            radius={'md'}
            c={COLORS.DANGER}
            bg={COLORS.LIGHTBLUE}
            // disabled={disableNoButton}
          >
            Ya
          </Button>
          <Button
            // loading={isLoading}
            onClick={close}
            variant="outline"
            w={'180px'}
            radius={'md'}
            c={COLORS.PRIMARY}
            color="blue"
          >
            Batal
          </Button>
        </Group>
      </Modal> */}

      <Text fw={600} fz={largeScreen ? '1.25rem' : '1rem'}>
        {firstLetterToUpperCase(pageTitle)}
      </Text>
      <MenuComp
        button={
          <UserProfile
            name={`${user.user?.firstname!} ${user.user?.lastname!}`}
            role={user.user?.role.toLowerCase()!}
          />
        }
      >
        <Menu.Item
          icon={<IconUser size={14} />}
          component="a"
          href="/"
          style={{ width: '180px' }}
        >
          Profile
        </Menu.Item>
        <Menu.Item onClick={open} icon={<IconLogout size={14} />}>
          Logout
        </Menu.Item>
      </MenuComp>

      {/* <Button onClick={() => handleLogout()}>Logout</Button> */}
    </Box>
  );
};

export default HeaderPage;
