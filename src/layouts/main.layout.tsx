import { AppShell, Navbar, Space } from '@mantine/core';
import React, { ReactNode, useState } from 'react';
import NavList from '../components/navbar/navbar-list.component';
import Image from 'next/image';
import NPEProLogo from '../assets/images/npe_pm_logo.png';

interface IMainLayout {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayout) => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ sm: '100%', lg: 300 }}
          pt={50}
          pl={30}
          hidden={!opened}
        >
          <Image
            src={NPEProLogo}
            width={100}
            height={50}
            alt="NPE Management Project Logo"
            quality={100}
          />
          <Space h={50} />

          <NavList />
        </Navbar>
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
