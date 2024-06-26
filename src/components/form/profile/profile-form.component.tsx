import { COLORS } from '@/src/constant/colors.constant';
import { UserContext } from '@/src/context/user-credential.context';
import { useProfileMember } from '@/src/hooks/profile/useProfileMember';
import { usePutUpdateProfile } from '@/src/hooks/profile/usePutUpdateProfile';
import {
  Avatar,
  Button,
  FileButton,
  Group,
  Select,
  SimpleGrid,
  Space,
  Stack,
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
import { useContext, useEffect, useState } from 'react';

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
  const [profileInitValue, setProfileInitValue] = useState({});
  const [image, setImage] = useState<any>(null);

  const { mutate: updateProfile } = usePutUpdateProfile();
  const { user } = useContext(UserContext);

  console.log('profile : ', initialValues?.profilePicture);

  const form = useForm({
    initialValues: {
      firstname: initialValues?.firstname || '',
      lastname: initialValues?.lastname || '',
      email: initialValues?.email || '',
      //   birthDate: userProfile?.birthDate,
      phoneNumber: initialValues?.phoneNumber || '',
      gender: initialValues?.gender || '',
      profilePicture: initialValues?.profilePicture || '',
    },
  });

  const handleSubmitUpdateProfile = form.onSubmit((values) => {
    updateProfile({ userId: user?.id as string, payload: values });
  });

  return (
    <form onSubmit={handleSubmitUpdateProfile}>
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
              value: 'Laki-laki',
            },
            {
              label: 'Perempuan',
              value: 'Perempuan',
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
