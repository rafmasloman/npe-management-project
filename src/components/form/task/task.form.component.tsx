import { members } from '@/pages/api/dummy/member.dummy.api';
import { COLORS } from '@/src/constant/colors.constant';
import {
  Button,
  Grid,
  Group,
  MultiSelect,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconPlus } from '@tabler/icons-react';
import ItemSelect from '../../input/select-item.input.component';
import ItemValue from '../../select/value-select.component';
import { useGetAllMilestone } from '@/src/hooks/milestone/useGetAllMilestones';
import { useGetMemberQuery } from '@/src/hooks/member/useGetQueryMember';
import { useForm, yupResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import { usePostTask } from '@/src/hooks/task/usePostTaskMutation';
import { useEffect, useState } from 'react';
import { useGetMilestonesByProject } from '@/src/hooks/milestone/useGetMilestoneByProject';
import { TaskFormSchema } from './task.schema';
import Link from 'next/link';
import { useGetTaskDetailQuery } from '@/src/hooks/task/useGetTaskDetailQuery';
import { useUpdateTask } from '@/src/hooks/task/useUpdateTask';

interface ITaskFormInitialValuePropsType {
  initialValues?: ITaskFormInitialValuesProps;
}
interface ITaskFormInitialValuesProps {
  taskId?: string;
  name?: string;
  status?: string;
  milestone?: {
    id?: string;
    milestoneName?: string;
  };
  member?: any[];
  deadline?: Date;
  priority?: string;
}

const TaskForm = ({ initialValues }: ITaskFormInitialValuePropsType) => {
  console.log('task id : ', initialValues?.taskId!);

  const [memberOption, setMemberOption] = useState([]);
  const [milestoneOption, setMilestoneOption] = useState([]);
  const { query } = useRouter();

  const { data: milestones } = useGetMilestonesByProject(query.id as string);
  const { data: members } = useGetMemberQuery();
  const { mutate: createTask } = usePostTask();
  const { mutate: updateTask } = useUpdateTask();

  const form = useForm({
    // validate: yupResolver(TaskFormSchema),
    initialValues: {
      name: initialValues?.name || '',
      projectId: '',
      milestoneId: initialValues?.milestone?.id || '',
      member:
        initialValues?.member?.map((m) => {
          return m.id;
        }) || '',
      priority: initialValues?.priority || '',
      endDate: initialValues?.deadline || null,
      status: initialValues?.status || '',
    },
  });

  useEffect(() => {
    if (members?.data && members?.data.length > 0) {
      const selectedMember = members?.data?.map((member: any) => {
        return {
          value: member.id,
          label: `${member.user?.firstname} ${member.user?.lastname}`,
        };
      });

      setMemberOption(selectedMember);
    }

    if (milestones?.data && milestones?.data.length > 0) {
      const selectedMilestone = milestones?.data?.map((milestone: any) => {
        return {
          value: milestone.id,
          label: milestone.milestoneName,
        };
      });

      setMilestoneOption(selectedMilestone);
    }
  }, [members, milestones]);

  const handleSubmit = form.onSubmit((values) => {
    const payload = {
      name: values.name,
      projectId: query.id as string,
      milestoneId: values.milestoneId,
      member: values.member,
      endDate: values.endDate,
      status: values.status,
      priority: values.priority,
    };

    console.log('task : ', payload);

    if (!initialValues) {
      createTask(payload);
    } else if (!!initialValues) {
      updateTask({ taskId: initialValues?.taskId!, payload });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
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
            {...form.getInputProps('name')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <DateInput
            label="Deadline"
            placeholder="Pilih Deadline"
            withAsterisk
            {...form.getInputProps('endDate')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            data={[
              {
                label: 'To do',
                value: 'TODO',
              },
              {
                label: 'On Progres',
                value: 'ON_PROGRESS',
              },
              {
                label: 'Completed',
                value: 'COMPLETED',
              },
            ]}
            placeholder="Pilih Status"
            label="Status"
            withAsterisk
            {...form.getInputProps('status')}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Select
            data={[
              { label: 'Low', value: 'LOW' },
              { label: 'Medium', value: 'MEDIUM' },
              { label: 'High', value: 'HIGH' },
            ]}
            placeholder="Pilih Tingkat Prioritas"
            label="Prioritas"
            withAsterisk
            {...form.getInputProps('priority')}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Stack>
            <Select
              data={milestoneOption}
              placeholder="Pilih Milestone"
              label="Milestone"
              withAsterisk
              {...form.getInputProps('milestoneId')}
            />
            <Link
              href={'/milestone/add-milestone'}
              className="text-xs w-fit"
              style={{ color: COLORS.PRIMARY }}
            >
              Buat Milestone
            </Link>
          </Stack>
        </Grid.Col>

        <Grid.Col span={12}>
          <MultiSelect
            data={memberOption}
            // itemComponent={ItemSelect}
            label="Tugaskan ke-"
            placeholder="Tambahkan tugas ke member"
            withAsterisk
            // searchable
            // valueComponent={ItemValue}

            {...form.getInputProps('member')}
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
