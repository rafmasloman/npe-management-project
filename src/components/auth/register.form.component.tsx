import { COLORS } from '@/src/constant/colors.constant';
import {
  Box,
  TextInput,
  PasswordInput,
  Stack,
  Button,
  Text,
  Anchor,
  Group,
  Alert,
  SimpleGrid,
} from '@mantine/core';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { IAuthLoginParams } from '@/src/interfaces/auth.interface';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { usePostLogin } from '@/src/hooks/auth/usePostLogin';
import { IApiBaseResponse } from '@/src/interfaces/base-response.interface';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconX } from '@tabler/icons-react';
import { useAuth } from '@/src/hooks/useAuth';
import { usePostRegister } from '@/src/hooks/auth/usePostRegister';
import { registrationDataSchema } from '@/src/shared/schema/registration.schema';

const RegisterForm = () => {
  const { mutate: register, isPending } = usePostRegister();

  const form = useForm({
    validate: yupResolver(registrationDataSchema),
    initialValues: {
      email: '',
      password: '',
      username: '',
      firstname: '',
      lastname: '',
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const payload = {
      email: values.email,
      password: values.password,
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
    };

    // register(payload);
    console.log(payload);
  });

  return (
    <Box
      bg={'white'}
      mx={'auto'}
      // pt={42}
      className="w-full"
    >
      <form onSubmit={handleSubmit}>
        <Stack h={'100%'} spacing={'50px'}>
          <Text fz={'1.25rem'} fw={700} ta="left">
            Registrasi
          </Text>
          <SimpleGrid
            breakpoints={[
              { minWidth: 'sm', cols: 1 },
              { minWidth: 'md', cols: 2 },
            ]}
            w={'100%'}
          >
            <TextInput
              label="Nama lengkap"
              placeholder="Masukkan Nama Depan"
              {...form.getInputProps('firstname')}
            />

            <TextInput
              label="Nama lengkap"
              placeholder="Masukkan Nama Belakang"
              {...form.getInputProps('lastname')}
            />

            <TextInput
              label="Username"
              placeholder="Masukkan Username"
              {...form.getInputProps('username')}
            />

            <TextInput
              label="Email"
              placeholder="Masukkan Email"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="Password"
              placeholder="Masukkan Password"
              {...form.getInputProps('password')}
            />

            <PasswordInput
              label="Konfirmasi Password"
              placeholder="Masukkan Konfirmasi Password"
              {...form.getInputProps('passwordConfirmation')}
            />
          </SimpleGrid>

          <Group w="100%" position="center">
            <Button
              radius={'md'}
              w={'100%'}
              type="submit"
              bg={COLORS.PRIMARY}
              loading={isPending}
            >
              Register
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterForm;
