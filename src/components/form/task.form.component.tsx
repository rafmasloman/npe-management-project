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
import { useGetAllMilestone } from '@/src/hooks/milestone/useGetAllMilestones';
import { useGetMemberQuery } from '@/src/hooks/member/useGetQueryMember';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { usePostTask } from '@/src/hooks/task/usePostTaskMutation';
import { useEffect, useState } from 'react';

const TaskForm = () => {
  // const queryMembers = members.map((member) => ({
  //   member,
  // }));

  const [memberOption, setMemberOption] = useState([]);
  const [milestoneOption, setMilestoneOption] = useState([]);

  const { query } = useRouter();
  console.log(query.id);

  const { data: milestones } = useGetAllMilestone();
  const { data: members } = useGetMemberQuery();
  const { mutate: createTask } = usePostTask();

  const form = useForm({
    // validate: yupResolver(schema),
    initialValues: {
      name: '',
      projectId: '',
      milestoneId: '',
      member: '',
      endDate: '',
      status: '',
    },
  });

  useEffect(() => {
    if (members?.data && members?.data.length > 0) {
      const selectedMember = members?.data?.map((member: any) => {
        return {
          value: member.id,
          label: member.user?.fullname,
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

  console.log(memberOption);

  const handleSubmit = form.onSubmit((values) => {
    const payload = {
      name: values.name,
      projectId: query.id as string,
      milestoneId: values.milestoneId,
      member: values.member,
      endDate: values.endDate,
      status: values.status,
    };

    createTask(payload);

    console.log(payload);
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
            data={milestoneOption}
            placeholder="Pilih Milestone"
            label="Milestone"
            withAsterisk
            {...form.getInputProps('milestoneId')}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <MultiSelect
            data={memberOption}
            // itemComponent={ItemSelect}
            label="Tugaskan ke-"
            placeholder="Tambahkan tugas ke member"
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
