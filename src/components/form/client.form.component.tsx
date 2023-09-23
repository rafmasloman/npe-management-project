import { COLORS } from '@/src/constant/colors.constant';
import {
  Button,
  FileInput,
  Grid,
  Group,
  NumberInput,
  TextInput,
} from '@mantine/core';
import { IconFilePlus, IconFileTypeDoc, IconPlus } from '@tabler/icons-react';

const ClientForm = () => {
  return (
    <form>
      <Grid mx={50} gutter={'xl'}>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            placeholder="Masukkan Nama Client"
            label="Nama Client"
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
          <NumberInput
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
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            placeholder="Masukkan Email Client"
            label="Email"
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
          <TextInput
            withAsterisk
            placeholder="Masukkan Alamat"
            label="Alamat   "
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
          <FileInput
            icon={<IconFileTypeDoc size={28} color={COLORS.GRAY} />}
            placeholder="Upload File"
            label="Upload"
            radius={'md'}
            styles={{
              input: {
                padding: 16,
                marginTop: 10,
              },
              icon: {
                marginLeft: 16,
              },
              placeholder: {
                marginLeft: 24,
              },
            }}
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

export default ClientForm;
