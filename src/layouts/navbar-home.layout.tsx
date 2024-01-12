import { Container, Group, Image } from '@mantine/core';
import NPEProLogo from '@/src/assets/images/npe_pm_logo.png';
import NavbarMainList from '../components/navbar/navbar-main-list.component';

const NavbarHome = () => {
  return (
    <Container fluid px={50} pt={20}>
      <Group position="apart">
        <Image
          src={NPEProLogo.src}
          width={100}
          height={50}
          alt="NPE Management Project Logo"
        />

        <NavbarMainList />
      </Group>
    </Container>
  );
};

export default NavbarHome;
