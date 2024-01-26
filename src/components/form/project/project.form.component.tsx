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
import { useRouter } from 'next/router';
import { usePutProject } from '@/src/hooks/project/usePutProjectMutation';

interface IProjectFormProps {
  initValue?: IProjectDataParams;
}

interface ISelectMemberDataStateProps {
  value: string;
  label: string;
}

const ProjectForm = ({ initValue }: IProjectFormProps) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [membersData, setMembersData] = useState<ISelectMemberDataStateProps[]>(
    [{ value: '', label: '' }],
  );

  const [selectedMembers, setSelectedMembers] = useState<string[]>([
    'Member1',
    'Member2',
  ]);

  // Fungsi untuk mengelola perubahan nilai
  const handleMembersChange = (values: string[]) => {
    setSelectedMembers(values);
  };

  const { mutate: createProject } = usePostProject();
  const { mutate: updateProject } = usePutProject();
  const { data: members } = useGetMemberQuery();

  const { pathname, query } = useRouter();

  const form = useForm({
    // validate: yupResolver(schema),
    initialValues: {
      projectName: initValue?.projectName || '',
      client: initValue?.client || '',
      platform: initValue?.platform || [],
      startedDate: initValue?.startedDate || '',
      endDate: initValue?.endDate || '',
      description: initValue?.description || '',
      projectIcon: initValue?.projectIcon || '',
      member: initValue?.members || [],
      image: '',
      price: initValue?.price || 0,
      members: initValue?.members || [],
    },
  });

  // const arrayFromWebsiteMobileString = initValue?.platform
  //   .replace('[', '')
  //   .replace(']', '')
  //   .split(', ')
  //   .map((item: any) => item.trim());

  const handleSubmit = form.onSubmit((values) => {
    const formData = new FormData();

    formData.set('projectName', values.projectName);
    formData.set('member', values.member as any);
    formData.set('description', values.description);
    formData.set('platform', values.platform as string);
    formData.set('startedDate', values.startedDate as string);
    formData.set('endDate', values.endDate as string);
    formData.set('projectIcon', values.projectIcon);
    formData.set('price', values.price.toString());

    if (!initValue) {
      createProject(formData);
    } else if (!!initValue) {
      console.log('date : ', formData.get('startedDate'));

      updateProject({ projectId: query.id, payload: formData });
    }
  });

  useEffect(() => {
    if (members?.data && members?.data.length > 0) {
      const selectMembers = members?.data?.map((member: any) => {
        return {
          value: member.id,
          label: `${member.user?.firstname} ${member.user?.lastname}`,
        };
      });

      // if (!!initValue?.members) {
      //   const initialMembers = initValue?.members?.map((member: any) => {
      //     return {
      //       value: member.id,
      //       label: member.user?.fullname,
      //     };
      //   });

      //   setMembersData(initialMembers as any);
      // }

      setMembersData(selectMembers);

      // setMembersData(selectMembers);
    }
  }, [members]);

  console.log('members : tes', membersData);

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
          <MultiSelect
            data={['Website', 'Mobile']}
            placeholder="Pilih Platform"
            label="Platform"
            radius={'md'}
            withAsterisk
            {...form.getInputProps('platform')}
            // value={[initValue?.platform!]}
          />
        </Grid.Col>
        <Grid.Col lg={6} md={1}>
          <MultiSelect
            data={selectedMembers}
            placeholder="Pilih Member"
            label="Member"
            radius={'md'}
            withAsterisk
            {...form.getInputProps('member')}
            value={selectedMembers}
            onChange={handleMembersChange}
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
              {...form.getInputProps('endDate')}
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
          <Button
            type="submit"
            bg={COLORS.PRIMARY}
            leftIcon={pathname.includes('add') ? <IconPlus /> : null}
          >
            {pathname.includes('add') ? 'Tambah Data' : 'Simpan Perubahan'}
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default ProjectForm;
