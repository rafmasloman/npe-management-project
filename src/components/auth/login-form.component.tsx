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
import {
  IconAlertCircle,
  IconLock,
  IconMail,
  IconX,
} from '@tabler/icons-react';
import { useAuth } from '@/src/hooks/useAuth';
import { IconPasswordFingerprint } from '@tabler/icons-react';

const schema = Yup.object().shape({
  email: Yup.string().required('email harus dimasukkan'),
  password: Yup.string().required('Password harus dimasukkan'),
});

const LoginForm = () => {
  const { login, isPending } = useAuth();

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const params: IAuthLoginParams = {
      email: values.email,
      password: values.password,
    };

    login(params);
  });

  return (
    <Box
      maw={400}
      bg={'white'}
      mx={'auto'}
      className="bg-white lg:p-10 rounded-3xl border border-solid border-neutral-300 shadow-sm"
    >
      <form onSubmit={handleSubmit}>
        <Stack h={'100%'} spacing={'40px'}>
          <Text fz={'1.25rem'} fw={700} ta="center">
            Login
          </Text>
          <Stack w={'100%'}>
            <TextInput
              label="Email"
              placeholder="Masukkan Email"
              {...form.getInputProps('email')}
              icon={<IconMail size={20} />}
            />
            <PasswordInput
              label="Password"
              placeholder="Masukkan Password"
              icon={<IconLock size={20} />}
              {...form.getInputProps('password')}
            />
          </Stack>

          <Group w="100%" position="center">
            <Button
              radius={'md'}
              w={'100%'}
              type="submit"
              bg={COLORS.PRIMARY}
              loading={isPending}
              className="text-base h-[45px]"
            >
              Login
            </Button>
            <Text fz={'0.825rem'} fw={500} ta="center">
              Belum memiliki akun ?{' '}
              <Anchor color={COLORS.PRIMARY}>Daftar disini</Anchor>
            </Text>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
