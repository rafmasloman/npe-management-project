import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { IProjectDataParams } from '@/src/interfaces/project.interface';
import {
  Button,
  Grid,
  Group,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { COLORS } from '@/src/constant/colors.constant';
import { IconPlus } from '@tabler/icons-react';

const schema = yup.object().shape({
  projectName: yup.string().required('Nama Project tidak boleh kosong'),
  client: yup.string().required('Mohon Pilih Client'),
  tags: yup.string().required('Mohon Pilih Tag'),
  startedDate: yup.string().required('Silahkan Pilih tanggal terlebih dulu'),
  endDate: yup.string().required('Silahkan Pilih tanggal terlebih dulu'),
  description: yup.string().required('Mohon masukkan deskripsi'),
});

interface IProjectFormProps {
  initValue?: IProjectDataParams;
}

const ProjectForm = ({ initValue }: IProjectFormProps) => {
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      projectName: initValue?.projectName || '',
      client: initValue?.client || '',
      tags: initValue?.tags || '',
      startedDate: initValue?.startedDate || '',
      endDate: initValue?.endDate || '',
      description: initValue?.description || '',
    },
  });

  return (
    <form>
      <Grid grow mx={50} gutter={'xl'}>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            placeholder="Masukkan Nama Project"
            label="Name"
            radius={'md'}
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
            data={[
              {
                label: 'Client',
                value: 'client',
              },
            ]}
            placeholder="Pilih Client"
            label="Clients"
            withAsterisk
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            data={[
              {
                label: 'Website',
                value: 'Website',
              },
            ]}
            placeholder="Pilih Platform"
            label="Platform"
            withAsterisk
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Group position="apart">
            {/* <TextInput withAsterisk /> */}
            <DateInput
              label="Tanggal Mulai"
              placeholder="Pilih tanggal mulai"
              w={'45%'}
              withAsterisk
            />
            <DateInput
              label="Tanggal Selesai"
              placeholder="Pilih tanggal selesai"
              w={'45%'}
              withAsterisk
            />
          </Group>
        </Grid.Col>

        <Grid.Col span={12}>
          <Textarea
            label="Deskripsi"
            placeholder="Masukkan Deskripsi Project"
          />
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Group position="right">
            <Button type="submit" bg={COLORS.PRIMARY} leftIcon={<IconPlus />}>
              Tambah
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default ProjectForm;
