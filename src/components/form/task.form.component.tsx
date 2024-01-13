import { members } from '@/pages/api/dummy/member.dummy.api';
import { COLORS } from '@/src/constant/colors.constant';
import {
  Button,
  Grid,
  Group,
  MultiSelect,
  Select,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconPlus } from '@tabler/icons-react';
import ItemSelect from '../input/select-item.input.component';
import ItemValue from '../select/value-select.component';

const TaskForm = () => {
  const queryMembers = members.map((member) => ({
    member,
  }));

  console.log(queryMembers);
  return (
    <form>
      <Grid>
        <Grid.Col span={12}>
          <TextInput
            withAsterisk
            placeholder="Masukkan Judul Task"
            label="Judul Task"
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
          <DateInput
            label="Tanggal Mulai"
            placeholder="Pilih tanggal selesai"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <DateInput
            label="Tanggal Selesai"
            placeholder="Pilih tanggal selesai"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            data={[
              {
                label: 'To do',
                value: 'todo',
              },
              {
                label: 'On Progres',
                value: 'onprogress',
              },
              {
                label: 'Completed',
                value: 'completed',
              },
            ]}
            placeholder="Pilih Status"
            label="Status"
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
            placeholder="Pilih Milestone"
            label="Milestone"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <MultiSelect
            data={members.map((member) => ({
              label: member.name,
              value: member.name,
              position: member.position,
            }))}
            // itemComponent={ItemSelect}
            label="Tugaskan ke-"
            placeholder="Tambahkan tugas ke member"
            searchable
            // valueComponent={ItemValue}
          />
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Button
            type="submit"
            bg={COLORS.PRIMARY}
            leftIcon={<IconPlus />}
            w={'100%'}
          >
            Tambah
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default TaskForm;
