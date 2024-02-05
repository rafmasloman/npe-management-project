import { Container, Group, Image, Stack, Text } from '@mantine/core';
import NPEProLogo from '@/src/assets/images/npe_ngatur.png';
import NavbarMainList from '../components/navbar/navbar-main-list.component';

const NavbarHome = () => {
  return (
    <Container fluid px={50} pt={20}>
      <Group position="apart">
        <Group spacing={10}>
          <Image
            src={NPEProLogo.src}
            width={56}
            height={56}
            alt="NPE Management Project Logo"
          />

          <div>
            <Text className="font-bold text-blue-950 text-2xl">NPE</Text>
            <Text className="font-bold text-blue-950 text-2xl">
              <span className="text-primary">Nga</span>Tur
            </Text>
          </div>
        </Group>

        <NavbarMainList />
      </Group>
    </Container>
  );
};

export default NavbarHome;
