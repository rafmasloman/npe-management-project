import { COLORS } from '@/src/constant/colors.constant';
import { useProfileMember } from '@/src/hooks/profile/useProfileMember';
import {
  Avatar,
  Button,
  FileButton,
  Select,
  SimpleGrid,
  Space,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import {
  IconCamera,
  IconCameraFilled,
  IconCheck,
  IconPencil,
  IconPencilBolt,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface IProfileFormTypeProps {
  initialValues?: IProfileFormValuesProps;
}

interface IProfileFormValuesProps {
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  gender: string;
  profilePicture: string;
}

const ProfileForm = ({ initialValues }: IProfileFormTypeProps) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [profileInitValue, setProfileInitValue] = useState({});

  console.log('initial values : ', initialValues);

  const form = useForm({
    initialValues: {
      firstname: initialValues?.firstname,
      lastname: initialValues?.lastname,
      email: initialValues?.email,
      //   birthDate: userProfile?.birthDate,
      phoneNumber: initialValues?.phoneNumber,
      gender: initialValues?.gender,
      profilePicture: initialValues?.profilePicture,
    },
  });

  const handleSubmitUpdateProfile = form.onSubmit((values) => {
    console.log('values : ', values);
  });

  return (
    <form onSubmit={handleSubmitUpdateProfile}>
      <FileButton onChange={setFile} accept="image/png, image/jpeg">
        {(props) => (
          <div className=" w-fit relative" {...props}>
            <Avatar
              size={70}
              radius={'100%'}
              src={!file ? initialValues?.profilePicture : file.name}
            />
            <IconCameraFilled
              className="absolute bottom-0 -right-1"
              size={25}
              style={{ color: COLORS.THIRD }}
            />
          </div>
        )}
      </FileButton>

      <Space h={50} />

      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 1 },
          { minWidth: 'md', cols: 2, spacing: 40 },
        ]}
      >
        <TextInput label="Nama Depan" {...form.getInputProps('firstname')} />
        <TextInput label="Belakang" {...form.getInputProps('lastname')} />
        <TextInput label="Email" {...form.getInputProps('email')} />

        {/* <DateInput label="Tanggal Lahir" {...form.getInputProps('birthDate')} /> */}

        <TextInput
          label="No.Telp"
          type="number"
          {...form.getInputProps('phoneNumber')}
        />

        <Select
          data={[
            {
              label: 'Laki-laki',
              value: 'laki-laki',
            },
            {
              label: 'Perempuan',
              value: 'perempuan',
            },
          ]}
          label="Jenis Kelamin"
          {...form.getInputProps('gender')}
          // withAsterisk
        />
      </SimpleGrid>

      <Space h={40} />

      <div className="text-right">
        <Button type="submit" bg={COLORS.PRIMARY} leftIcon={<IconCheck />}>
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
