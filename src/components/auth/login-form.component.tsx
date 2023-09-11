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
} from '@mantine/core';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { IAuthLoginParams } from '@/src/interfaces/auth.interface';
import { useRouter } from 'next/router';


const schema = Yup.object().shape({
  username: Yup.string().required('Username harus dimasukkan'),
  password: Yup.string().required('Password harus dimasukkan'),
});

const LoginForm = () => {

  const {push} = useRouter()
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const params: IAuthLoginParams = {
      username: values.username,
      password: values.password,
    };

    console.log(params);
  });

  return (
    <Box
      maw={400}
      h={450}
      bg={'white'}
      mx={'auto'}
      pt={42}
      px={20}
      style={{
        borderRadius: '1.25rem',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack h={'100%'} spacing={'50px'}>
          <Text fz={'1.25rem'} fw={700} align="center">
            Login
          </Text>
          <Stack w={'100%'}>
            <TextInput
              label="Email"
              placeholder="Masukkan Email"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="Password"
              placeholder="Masukkan Password"
              {...form.getInputProps('password')}
            />
          </Stack>

          <Group w="100%" position="center">
            <Button radius={'md'} w={'100%'} type="submit">
              Login
            </Button>
            <Text fz={'0.825rem'} fw={500} align="center">
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
