import { COLORS } from '@/src/constant/colors.constant';
import {
  Button,
  FileInput,
  Grid,
  Group,
  MultiSelect,
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
import { useEffect, useState } from 'react';
import { IApiCreatePostUserMutationParams } from '@/src/interfaces/api/user/user-api.interface';
import { usePostUser } from '@/src/hooks/user/usePostUser';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';
import { usePostClientMutation } from '@/src/hooks/client/usePostClient';
import { useGetProjectQuery } from '@/src/hooks/project/useGetProjectQuery';
import { IClientInitialValuesParams } from '@/src/interfaces/client.interface';
import { usePutClientMutation } from '@/src/hooks/client/usePutClient';
import { userSchema } from './user.schema';
import { useUpdateUserMutation } from '@/src/hooks/user/useUpdateUserMutation';

interface IUserInitialValueParams {
  initialValues?: IApiCreatePostUserMutationParams;
}

interface IUserOptionValueTypes {
  value: string;
  label: string;
}

const UserForm = ({ initialValues }: IUserInitialValueParams) => {
  const { mutate: createUser, isPending } = usePostUser();
  const {
    mutate: updateUser,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateUserMutation();

  const { query } = useRouter();

  const form = useForm({
    validate: yupResolver(userSchema),
    initialValues: {
      username: initialValues?.username || '',
      email: initialValues?.email || '',
      password: initialValues?.password || '',
      firstname: initialValues?.firstname || '',
      lastname: initialValues?.lastname || '',
      role: initialValues?.role || '',
    },
  });

  console.log('pass : ', form.values);

  const handleSubmit = form.onSubmit((values) => {
    const params = {
      username: values.username,
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
      role: values.role,
    };

    if (!initialValues) {
      createUser(params);
    } else if (!!initialValues) {
      updateUser({ userId: query.userId as string, params });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid gutter={'xl'}>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            placeholder="Masukkan Username"
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
          <TextInput
            withAsterisk
            placeholder="Masukkan Nama Depan"
            label="Nama Depan"
            radius={'md'}
            {...form.getInputProps('firstname')}
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
            placeholder="Masukkan Nama Belakang"
            label="Nama Belakang"
            radius={'md'}
            {...form.getInputProps('lastname')}
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            label="Roles"
            placeholder="Pilih Role"
            data={[
              { label: 'Admin', value: 'ADMIN' },
              { label: 'Staff', value: 'STAFF' },
              { label: 'Project Manager', value: 'PROJECT_MANAGER' },
            ]}
            {...form.getInputProps('role')}
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
              },
              innerInput: {
                height: '100%',
                padding: 24,
              },
            }}
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
              {!query.id ? 'Tambah Client' : 'Update Client'}
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default UserForm;
