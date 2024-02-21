import { members } from '@/pages/api/dummy/member.dummy.api';
import { COLORS } from '@/src/constant/colors.constant';
import {
  Grid,
  TextInput,
  Select,
  MultiSelect,
  Button,
  Group,
  Avatar,
  Text,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconPhone, IconPlus } from '@tabler/icons-react';
import ItemSelect from '../../input/select-item.input.component';
import ItemValue from '../../select/value-select.component';
import { useForm, yupResolver } from '@mantine/form';
import { useGetMemberQuery } from '@/src/hooks/member/useGetQueryMember';
import { forwardRef, useEffect, useState } from 'react';
import { useGetProjectQuery } from '@/src/hooks/project/useGetProjectQuery';
import SelectItem from '../../select/single-select.component';
import { usePostPayroll } from '@/src/hooks/payroll/usePostPayrollMutation';
import { IMemberFormTypeProps } from './member.interfaces';
import { useGetUserRoleQuery } from '@/src/hooks/user/useGetUserRoleQuery';
import { IconPhoneCall } from '@tabler/icons-react';
import { MemberSchema } from './member.schema';
import { usePostMemberMutation } from '@/src/hooks/member/usePostMemberMutation';

interface IProjectItemsSelect extends React.ComponentPropsWithoutRef<'div'> {
  projectIcon: string;
  label: string;
}

const MemberForm = () => {
  const [userSelectOption, setUserSelectOption] = useState([]);

  const { data: getUserRoleStaff, isSuccess } = useGetUserRoleQuery();
  const { mutate: createMember } = usePostMemberMutation();

  const form = useForm<IMemberFormTypeProps>({
    validate: yupResolver(MemberSchema),
    initialValues: {
      position: '',
      birthDate: '',
      gender: '',
      phoneNumber: '',
      userId: '',
    },
  });

  useEffect(() => {
    setUserSelectOption(
      !getUserRoleStaff
        ? []
        : getUserRoleStaff?.data?.map((user: any) => {
            return {
              label: `${user.firstname} ${user.lastname}`,
              value: user.id,
            };
          }),
    );
  }, [getUserRoleStaff, isSuccess]);

  const handleSubmitForm = form.onSubmit((values) => {
    const formData = new FormData();

    formData.set('position', values.position);
    formData.set('gender', values.gender);
    formData.set('phoneNumber', values.phoneNumber);
    formData.set('birthDate', values.birthDate);
    formData.set('userId', values.userId);

    // console.log('values params : ', formData);
    createMember(formData);
  });

  return (
    <form onSubmit={handleSubmitForm}>
      <Grid>
        <Grid.Col span={6}>
          <Select
            data={userSelectOption}
            placeholder="Pilih Team Member"
            label="Team Member"
            // nothingFound="Member not found"
            searchable
            withAsterisk
            // filter={(value, item) =>
            //     item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
            //     item.value?.toLowerCase().includes(value.toLowerCase().trim())
            //   }
            {...form.getInputProps('userId')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            placeholder="Berikan Posisi Crew"
            label="Posisi / Job"
            withAsterisk
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
            {...form.getInputProps('position')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            data={[
              { label: 'Laki-laki', value: 'laki-laki' },
              { label: 'Perempuan', value: 'perempuan' },
            ]}
            placeholder="Pilih Jenis Kelamin"
            label="Jenis Kelamin"
            {...form.getInputProps('gender')}
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            placeholder="0812....."
            label="No.Telp"
            type="number"
            rightSection={
              <Group className="bg-slate-200 flex justify-center h-full w-full rounded-tr-lg rounded-br-lg">
                <Text className=" text-slate-500 font-medium">ID</Text>
              </Group>
            }
            withAsterisk
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
              rightSection: {
                width: 50,
              },
            }}
            {...form.getInputProps('phoneNumber')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <DateInput
            // valueFormat="YYYY MMM DD"
            label="Tanggal Lahir"
            placeholder="Tanggal Lahir"
            withAsterisk
            {...form.getInputProps('birthDate')}
          />
        </Grid.Col>

        <Grid.Col span={6}></Grid.Col>

        <Grid.Col span={2} mt={30}>
          <div className="">
            <Button
              type="submit"
              bg={COLORS.PRIMARY}
              leftIcon={<IconPlus />}
              w={'100%'}
            >
              Tambah
            </Button>
          </div>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default MemberForm;
