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
import { usePostProject } from '@/src/hooks/project/usePostProjectMutation';
import { useGetMemberQuery } from '@/src/hooks/member/useGetQueryMember';

interface IProjectFormProps {
  initValue?: IProjectDataParams;
}

const ProjectForm = ({ initValue }: IProjectFormProps) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [membersData, setMembersData] = useState([]);

  const { mutate: createProject } = usePostProject();
  const { data: members } = useGetMemberQuery();

  console.log('members : ', members);

  const form = useForm({
    // validate: yupResolver(schema),
    initialValues: {
      projectName: initValue?.projectName || '',
      client: initValue?.client || '',
      platform: initValue?.platform || '',
      startedDate: initValue?.startedDate || '',
      endDate: initValue?.endDate || '',
      description: initValue?.description || '',
      projectIcon: initValue?.projectIcon || '',
      member: '',
      image: '',
      price: 0,
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const formData = new FormData();

    // const payload = Object.entries(values).map(([key, value]) => ({
    //   key,
    //   value,
    // }));

    // payload.map((data) => {
    //   formData.append(data.key, data.value);
    // });

    // console.log('form data : ', formData);

    formData.set('projectName', values.projectName);
    formData.set('member', values.member);
    formData.set('description', values.description);
    formData.set('client', values.client);
    formData.set('platform', values.platform);
    formData.set('startedDate', values.startedDate as string);
    formData.set('endDate', values.endDate as string);
    formData.set('projectIcon', values.projectIcon);
    formData.set('price', values.price.toString());

    console.log('payload members : ', formData.get('member'));

    createProject(formData);
  });

  useEffect(() => {
    if (members?.data && members?.data.length > 0) {
      const selectProject = members?.data?.map((member: any) => {
        return {
          value: member.id,
          label: member.user?.fullname,
        };
      });
      setMembersData(selectProject);
    }
  }, [members]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid grow gutter={'xl'}>
        <Grid.Col lg={6} md={1}>
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
            {...form.getInputProps('projectName')}
          />
        </Grid.Col>
        <Grid.Col lg={6} md={1}>
          <Select
            data={[
              {
                label: 'Client',
                value: 'client',
              },
            ]}
            placeholder="Pilih Client"
            label="Clients"
            {...form.getInputProps('client')}
            // withAsterisk
          />
        </Grid.Col>
        <Grid.Col lg={6} md={1}>
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
            {...form.getInputProps('platform')}
          />
        </Grid.Col>
        <Grid.Col lg={6} md={1}>
          <MultiSelect
            data={membersData}
            placeholder="Pilih Member"
            label="Member"
            withAsterisk
            {...form.getInputProps('member')}
          />
        </Grid.Col>
        <Grid.Col lg={6} md={1}>
          <Group position="apart">
            <DateInput
              label="Tanggal Mulai"
              placeholder="Pilih tanggal mulai"
              w={'45%'}
              withAsterisk
              {...form.getInputProps('startedDate')}
            />
            <DateInput
              label="Tanggal Selesai"
              placeholder="Pilih tanggal selesai"
              w={'45%'}
              withAsterisk
              {...form.getInputProps('enddDate')}
            />
          </Group>
        </Grid.Col>

        <Grid.Col lg={6} md={1}>
          <NumberInput
            placeholder="Harga Project"
            label="Biaya"
            {...form.getInputProps('price')}
          />
        </Grid.Col>

        <Grid.Col lg={6} md={1}>
          <FileInput
            placeholder="Pilih Logo"
            label="Logo Project"
            icon={<IconFileTypeSvg size={20} color={COLORS.GRAY} />}
            {...form.getInputProps('projectIcon')}
          />
        </Grid.Col>

        {/* <Grid.Col span={12}>
          <Textarea
            label="Deskripsi"
            placeholder="Masukkan Deskripsi Project"
            {...form.getInputProps('description')}
          />
        </Grid.Col> */}

        {/* <Grid.Col span={12}>
          <Dropzone
            accept={IMAGE_MIME_TYPE}
            onDrop={setFiles}
            {...form.getInputProps('image')}
          >
            <Text ta={'center'}>Drop images here</Text>
          </Dropzone>
        </Grid.Col> */}

        <Grid.Col span={12} mt={30}>
          <Button type="submit" bg={COLORS.PRIMARY} leftIcon={<IconPlus />}>
            Tambah
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default ProjectForm;
