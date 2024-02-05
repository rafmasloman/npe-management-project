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
import { clientSchema } from './client.schema';
import { usePostClientMutation } from '@/src/hooks/client/usePostClient';
import { useGetProjectQuery } from '@/src/hooks/project/useGetProjectQuery';
import { IClientInitialValuesParams } from '@/src/interfaces/client.interface';
import { usePutClientMutation } from '@/src/hooks/client/usePutClient';

interface IClientInitialValueParams {
  initialValues?: IClientInitialValuesParams;
}

interface IClientOptionValueTypes {
  value: string;
  label: string;
}

const ClientForm = ({ initialValues }: IClientInitialValueParams) => {
  const { mutate: createClient, isPending } = usePostClientMutation();
  const {
    mutate: updateClient,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = usePutClientMutation();
  const { data: projects, isSuccess } = useGetProjectQuery(undefined, '');

  const [projectsOption, setProjectsOption] = useState<
    IClientOptionValueTypes[]
  >([]);

  const { query } = useRouter();

  const form = useForm({
    validate: yupResolver(clientSchema),
    initialValues: {
      name: initialValues?.name || '',
      phoneNumber: initialValues?.phoneNumber || '',
      address: initialValues?.address || '',
      email: initialValues?.email || '',
      project: initialValues?.project.id || '',
    },
  });

  useEffect(() => {
    if (!isSuccess) {
      setProjectsOption([]);
    } else {
      const project = projects?.data?.map((project: any) => {
        return {
          value: project.id,
          label: project.projectName,
        };
      });
      setProjectsOption(project);
    }
  }, [projects, isSuccess]);

  const handleSubmit = form.onSubmit((values) => {
    const params = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
      project: values.project,
    };


    if (!initialValues) {

      createClient(params);
    } else if (!!initialValues) {
      updateClient({ clientId: query.id as string, payload: params });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid gutter={'xl'}>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            placeholder="Masukkan Nama Client"
            label="Nama Client"
            radius={'md'}
            {...form.getInputProps('name')}
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
            placeholder="Masukkan Email Client"
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
            placeholder="Masukkan No. Telp Client"
            label="Nomor Telepon"
            radius={'md'}
            type="number"
            {...form.getInputProps('phoneNumber')}
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
            placeholder="Masukkan Alamat Tempat tinggal"
            label="Alamat"
            radius={'md'}
            {...form.getInputProps('address')}
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
            label="Projects"
            placeholder="Pilih Project"
            data={projectsOption}
            {...form.getInputProps('project')}
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

export default ClientForm;
