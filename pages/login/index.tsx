import SEO from '@/src/components/SEO/seo.component';
import LoginForm from '@/src/components/auth/login-form.component';
import { Text, Container, Group, Space, SimpleGrid } from '@mantine/core';
import Image from 'next/image';
import NPELogo from '@/src/assets/images/npe_pm_logo.png';

const Login = () => {
  return (
    <>
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

      <Group className="absolute left-10 top-10">
        <Image src={'/npe_logo.svg'} width={50} height={50} alt="Logo" />
        <Text fw={600} fz={'1.25rem'} color="black">
          NPE Operations
        </Text>
      </Group>

      <SimpleGrid cols={2} className="h-screen">
        <div className=" flex flex-col justify-center">
          <Space h={50} />
          <LoginForm />
        </div>

        <div className="bg-primary rounded-tl-[60px] rounded-br-[60px]">
          {/* <Image src={NPELogo.src} width={70} height={70} /> */}
        </div>
      </SimpleGrid>
    </>
  );
};

export default Login;
