import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { IProjectDataParams } from '@/src/interfaces/project.interface';
import {
  Button,
  FileInput,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { DateInput } from '@mantine/dates';
import { COLORS } from '@/src/constant/colors.constant';
import { IconFileTypeSvg, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { IMilestoneDataParams } from '@/src/interfaces/milestone.interface';
import { schema } from './milestone.schema';
import { useGetProjectQuery } from '@/src/hooks/project/useGetProjectQuery';
import { usePostMilestone } from '@/src/hooks/milestone/usePostMilestone';
import { usePutMilestone } from '@/src/hooks/milestone/usePutMilestone';
import { useRouter } from 'next/router';
import { useGetMemberQuery } from '@/src/hooks/member/useGetQueryMember';

interface IMilestoneFormProps {
  initValue?: IMilestoneDataParams;
}

interface ISelectMemberDataStateProps {
  value: string;
  label: string;
}
const MilestoneForm = ({ initValue }: IMilestoneFormProps) => {
  const [selectProject, setSelectProject] = useState([]);
  const [membersData, setMembersData] = useState<ISelectMemberDataStateProps[]>(
    [{ value: '', label: '' }],
  );

  const { data: projects } = useGetProjectQuery(undefined, '');
  const { mutate: createMilestone } = usePostMilestone();
  const { mutate: updateMilestone } = usePutMilestone();

  const { data: members } = useGetMemberQuery();

  const { query } = useRouter();

  const form = useForm({
    // validate: yupResolver(schema),
    initialValues: {
      milestoneName: initValue?.milestoneName || '',
      projectId: initValue?.projectId || '',
      startedDate: initValue?.startedDate || '',
      endDate: initValue?.endDate || '',
      status: initValue?.status || 'TO DO',
      member:
        initValue?.member?.map((member: any) => {
          return member.id;
        }) || [],
    },
  });

  useEffect(() => {
    const selectMembers = !members
      ? []
      : members?.data?.map((member: any) => {
          return {
            value: member.id,
            label: `${member.user?.firstname} ${member.user?.lastname}`,
          };
        });

    if (projects?.data && projects?.data.length > 0) {
      const selectProject = projects?.data?.map((project: any) => {
        return {
          value: project.id,
          label: project.projectName,
        };
      });
      setSelectProject(selectProject);
    }

    setMembersData(selectMembers);
  }, [projects, members]);

  const handleSubmit = form.onSubmit((values) => {
    const payload = {
      milestoneName: values.milestoneName,
      projectId: values.projectId,
      startedDate: values.startedDate as string,
      endDate: values.endDate as string,
      status: values.status,
      member: values.member,
    };

    console.log('milestone : ', payload);

    if (!initValue) {
      createMilestone(payload);
    } else if (!!initValue) {
      updateMilestone({ milestoneId: query.milestoneId, payload });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid grow gutter={'xl'}>
        <Grid.Col lg={6} md={1}>
          <TextInput
            withAsterisk
            placeholder="Masukkan Judul Milestone"
            label="Name"
            radius={'md'}
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
            {...form.getInputProps('milestoneName')}
          />
        </Grid.Col>

        <Grid.Col lg={6} md={1}>
          <Select
            withAsterisk
            placeholder="Pilih Project"
            label="Project"
            radius={'md'}
            // data={projects?.data}
            data={selectProject}
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
            {...form.getInputProps('projectId')}
          />
        </Grid.Col>

        <Grid.Col lg={6} md={1}>
          <MultiSelect
            data={membersData}
            placeholder="Pilih Member"
            label="Member"
            radius={'md'}
            withAsterisk
            {...form.getInputProps('member')}
          />
        </Grid.Col>

        <Grid.Col lg={6} md={1}>
          <Group position="apart">
            <DateInput
              label="Tanggal Mulai"
              placeholder="Pilih tanggal mulai"
              w={'48%'}
              withAsterisk
              {...form.getInputProps('startedDate')}
            />
            <DateInput
              label="Tanggal Selesai"
              placeholder="Pilih tanggal selesai"
              w={'48%'}
              withAsterisk
              {...form.getInputProps('endDate')}
            />
          </Group>
        </Grid.Col>

        <Grid.Col lg={12} md={1}>
          <Select
            withAsterisk
            placeholder="Pilih Status"
            label="Status"
            radius={'md'}
            // data={projects?.data}
            data={[
              { value: 'TODO', label: 'To Do' },
              { value: 'ON_PROGRESS', label: 'On_Progress' },
              { value: 'COMPLETED', label: 'Completed' },
            ]}
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
            {...form.getInputProps('status')}
          />
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Button type="submit" bg={COLORS.PRIMARY} leftIcon={<IconPlus />}>
            {!query.milestoneId ? 'Tambah' : 'Simpan'}
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default MilestoneForm;
