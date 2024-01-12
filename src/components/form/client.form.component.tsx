import { COLORS } from '@/src/constant/colors.constant';
import {
  Button,
  FileInput,
  Grid,
  Group,
  NumberInput,
  PasswordInput,
  Select,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { IconFilePlus, IconFileTypeDoc, IconPlus } from '@tabler/icons-react';
import * as Yup from 'yup';
import { useQuery, useMutation } from '@tanstack/react-query';
import UserQueryApi from '@/pages/api/user/user-query';
import UserMutationApi from '@/pages/api/user/user-mutation';
import { useState } from 'react';
import { IApiCreatePostUserMutationParams } from '@/src/interfaces/user/user-api.interface';
import { usePostUser } from '@/src/hooks/user/usePostUser';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';

const schema = Yup.object().shape({
  fullname: Yup.string().required('Mohon isi nama lengkap anda'),
  email: Yup.string().required('Mohon isi email anda'),
  username: Yup.string().required('Mohon isi username anda'),
  password: Yup.string().required('Mohon isi password anda'),
  role: Yup.string().required('Mohon pilih role terlebih dahulu'),
});

const UserForm = () => {
  const { data: readRoles } = useQuery({
    queryKey: ['role-id-key'],
    queryFn: () => UserQueryApi.getAllRoleQuery(),
  });

  const { mutate: createUser, isPending } = usePostUser();

  const roles = readRoles?.data!;

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      fullname: '',
      email: '',
      username: '',
      password: '',
      role: '',
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const params = {
      fullname: values.fullname,
      email: values.email,
      username: values.username,
      password: values.password,
      role: Number(values.role),
    };

    // createUser(params);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid gutter={'xl'}>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            placeholder="Masukkan Nama User"
            label="Nama Lengkap"
            radius={'md'}
            {...form.getInputProps('fullname')}
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          {/* <NumberInput
            withAsterisk
            hideControls
            placeholder="62"
            label="No. Telp"
            radius={'md'}
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
          /> */}
          <TextInput
            withAsterisk
            placeholder="Masukkan username"
            label="Username"
            radius={'md'}
            {...form.getInputProps('username')}
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            placeholder="Masukkan Email User"
            label="Email"
            radius={'md'}
            {...form.getInputProps('email')}
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <PasswordInput
            withAsterisk
            placeholder="Masukkan Password"
            label="Password"
            radius={'md'}
            {...form.getInputProps('password')}
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
              },
              innerInput: {
                paddingTop: 14,
              },
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Pilih Role"
            placeholder="Pilih salah satu"
            data={['STAFF', 'ADMIN', 'PROJECT MANAGEMENT']}
            {...form.getInputProps('role')}
          />
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Group position="right">
            <Button
              type="submit"
              loading={isPending}
              bg={COLORS.PRIMARY}
              leftIcon={<IconPlus />}
            >
              Tambah
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default UserForm;
