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
import { IconPlus } from '@tabler/icons-react';
import ItemSelect from '../../input/select-item.input.component';
import ItemValue from '../../select/value-select.component';
import { useForm, yupResolver } from '@mantine/form';
import { useGetMemberQuery } from '@/src/hooks/member/useGetQueryMember';
import { forwardRef, useEffect, useState } from 'react';
import { useGetProjectQuery } from '@/src/hooks/project/useGetProjectQuery';
import SelectItem from '../../select/single-select.component';
import { PayrollSchema } from './payroll.schema';
import { usePostPayroll } from '@/src/hooks/payroll/usePostPayrollMutation';

interface IProjectItemsSelect extends React.ComponentPropsWithoutRef<'div'> {
  projectIcon: string;
  label: string;
}

// eslint-disable-next-line react/display-name

const PayrollForm = () => {
  const [memberValue, setMemberValue] = useState([]);
  const [projectSelectOption, setProjectSelectOption] = useState([]);

  const form = useForm({
    validate: yupResolver(PayrollSchema),
    initialValues: {
      projectId: '',
      memberId: '',
      percent: 0,
      transactionProvider: '',
    },
  });

  const { data: staffs, isSuccess } = useGetMemberQuery();
  const { data: projects, isSuccess: isSuccessGetProject } = useGetProjectQuery(
    '',
    '',
  );
  const { mutate: createPayroll } = usePostPayroll();

  useEffect(() => {
    setMemberValue(
      !staffs
        ? []
        : staffs?.data?.map((staff: any) => {
            return {
              label: staff?.user?.firstname,
              value: staff?.id,
            };
          }),
    );

    setProjectSelectOption(
      !projects
        ? []
        : projects?.data?.map((project: any) => {
            return {
              icon: project?.projectIcon,
              label: project?.projectName,
              value: project?.id,
            };
          }),
    );
  }, [staffs, projects, isSuccessGetProject, isSuccess]);

  const paymentAccount: Array<any> = [
    {
      account: 'BRI',
    },
  ];

  const handleSubmitForm = form.onSubmit((values) => {
    const params = {
      memberId: values.memberId,
      projectId: values.projectId,
      percent: Number(values.percent),
      transactionProvider: values.transactionProvider,
    };

    console.log('values params : ', params);
    createPayroll(params);
  });

  return (
    <form onSubmit={handleSubmitForm}>
      <Grid>
        <Grid.Col span={6}>
          <Select
            data={memberValue}
            placeholder="Pilih Team Member"
            label="Team Member"
            // nothingFound="Member not found"
            // searchable
            withAsterisk
            {...form.getInputProps('memberId')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            data={projectSelectOption}
            placeholder="Pilih Project"
            label="Projects"
            itemComponent={SelectItem}
            nothingFound="Projects not found"
            searchable
            filter={(value, item) =>
              item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.value?.toLowerCase().includes(value.toLowerCase().trim())
            }
            {...form.getInputProps('projectId')}
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            data={paymentAccount.map((payment) => ({
              label: payment.account,
              value: payment.account,
            }))}
            placeholder="Pilih Jenis Transfer"
            label="Transfer"
            {...form.getInputProps('transactionProvider')}
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            placeholder="Masukkan Persen Gaji"
            label="Persen Gaji"
            withAsterisk
            type="number"
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
            {...form.getInputProps('percent')}
          />
        </Grid.Col>

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

export default PayrollForm;
