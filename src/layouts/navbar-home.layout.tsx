import { Container, Group, Image, Stack, Text } from '@mantine/core';
import NPEProLogo from '@/src/assets/images/npe_logo.png';
import NavbarMainList from '../components/navbar/navbar-main-list.component';

const NavbarHome = () => {
  return (
    <Container fluid px={50} pt={20}>
      <Group position="apart">
        <Group>
          <Image
            src={NPEProLogo.src}
            width={56}
            height={56}
            alt="NPE Management Project Logo"
          />
          {/* <div>
            <Text className="font-semibold text-primary text-xl">NPE</Text>
            <Text className="font-semibold text-primary text-xl">Simplify</Text>
          </div> */}
        </Group>

        <NavbarMainList />
      </Group>
    </Container>
  );
};

export default NavbarHome;
