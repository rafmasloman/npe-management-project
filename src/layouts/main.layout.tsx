import {
  AppShell,
  Box,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Space,
  Image,
  ScrollArea,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import React, { ReactNode, useState } from 'react';
import NavList from '../components/navbar/navbar-list.component';
// import Image from 'next/image';
import NPEProLogo from '../assets/images/npe_logo.png';
import { COLORS } from '../constant/colors.constant';
import HeaderPage from '../components/header/header-page.component';
import { useRouter } from 'next/router';

interface IMainLayout {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayout) => {
  const [opened, setOpened] = useState(false);

  const { pathname } = useRouter();

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ sm: 200, lg: 300 }}
          // height={'100vh'}
          pt={50}
          pl={30}
          hiddenBreakpoint={'sm'}
          style={{ borderWidth: 0 }}
          hidden={!opened}
          className="overflow-y-scroll no-scrollbar"
          styles={{}}
        >
          <NavList />
        </Navbar>
      }
      header={
        <Header
          w={{ lg: 300 }}
          height={{ base: 60, md: 80, sm: 100 }}
          pl={40}
          pt={'lg'}
          style={{ borderWidth: 0 }}
        >
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="md"
              color={COLORS.DEEPBLUE}
              mr="lg"
            />
          </MediaQuery>
          <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
            <Group spacing={10}>
              <Image
                src={NPEProLogo.src}
                width={50}
                height={50}
                alt="NPE Management Project Logo"
              />

              <Stack spacing={0}>
                <Text className="font-bold text-primary text-xl">NPE</Text>
                <Text className="font-bold text-primary text-xl">Simplify</Text>
              </Stack>
            </Group>
          </MediaQuery>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default MainLayout;
