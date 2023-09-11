import SEO from '@/src/components/SEO/seo.component';
import LoginForm from '@/src/components/auth/login-form.component';
import { Text, Container, Group, Space } from '@mantine/core';
import Image from 'next/image';

const Login = () => {
  return (
    <div
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
    </div>
  );
};

export default Login;
