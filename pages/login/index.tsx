import SEO from '@/src/components/SEO/seo.component';
import LoginForm from '@/src/components/auth/login-form.component';
import {
  Text,
  Container,
  Group,
  Space,
  SimpleGrid,
  Image,
  Stack,
  BackgroundImage,
  Box,
} from '@mantine/core';
// import Image from 'next/image';
import NPELogo from '@/src/assets/images/npe_logo.png';
import NPELogoWhite from '@/src/assets/images/npe_logo_white.png';
import { COLORS } from '@/src/constant/colors.constant';

const Login = () => {
  return (
    <div>
      {/* <div
        style={{
          height: '100vh',
          background: `linear-gradient(to right top, rgba(0, 32, 96, 1), rgba(0, 48, 115, 1))`, // Gradient dari kiri bawah ke kanan atas,
        }}
      >
        <SEO title="Login" />

        <Space h={50} />
        <Group position="center">
          <Image src={'/npe_logo.svg'} width={50} height={50} alt="Logo" />
          <Text fw={600} fz={'1.25rem'} color="white">
            NPE Digital
          </Text>
        </Group>

        <Space h={50} />
        <LoginForm />
      </div> */}

      <SEO title="Login Page" />

      <Group className="  absolute left-10 top-10">
        <Image src={NPELogo.src} width={50} height={50} alt="Logo" />
        <Text fw={600} fz={'1.25rem'} color={COLORS.SECONDARY}>
          NPE Ngatur
        </Text>
      </Group>

      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 1 },
          { minWidth: 'md', cols: 2 },
        ]}
        className="h-screen"
      >
        <div className=" flex flex-col justify-center">
          {/* <Space h={50} /> */}
          <LoginForm />
        </div>

        <div className="bg-primary rounded-tl-[60px] rounded-bl-[60px]  hidden lg:flex justify-center items-center relative">
          <Image
            src={NPELogoWhite.src}
            width={500}
            height={550}
            className="opacity-10 absolute"
            alt="NPE Logo"
          />

          <Stack align="center" spacing={30}>
            <Image src={NPELogoWhite.src} width={120} height={130} alt="Logo" />
            <Text className="text-5xl text-white font-semibold" color={'white'}>
              NPE Ngatur
            </Text>
          </Stack>
        </div>
      </SimpleGrid>
    </div>
  );
};

export default Login;
