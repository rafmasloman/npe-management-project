import { members } from '@/pages/api/dummy/member.dummy.api';
import { COLORS } from '@/src/constant/colors.constant';
import { Grid, TextInput, Select, MultiSelect, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconPlus } from '@tabler/icons-react';
import ItemSelect from '../input/select-item.input.component';
import ItemValue from '../select/value-select.component';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';

const schema = yup.object().shape({
  memberName: yup.string().required('Nama tidak boleh kosong'),
  paymentAccount: yup.string().required('Tipe pembayaran tidak boleh kosong'),
  paidPersentation: yup.string().required('Persentasi gaji harus disi'),
});

const PayrollForm = () => {
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      memberName: '',
      paymentAccount: '',
      paidPersentation: '',
    },
  });

  const paymentAccount: Array<any> = [
    {
      account: 'BRI',
      chars: 2500,
    },
    {
      account: 'Go-Pay',
      chars: 0,
    },
  ];

  return (
    <form>
      <Grid>
        <Grid.Col span={12}>
          <Select
            data={members.map((member) => ({
              label: member.name,
              value: member.name,
            }))}
            placeholder="Pilih Team Member"
            label="Team Member"
            nothingFound="Member not found"
            searchable
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <DateInput
            label="Tanggal Mulai"
            placeholder="Pilih tanggal Mulai"
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
          {/* <Select
            data={paymentAccount.map((payment) => ({
              label: payment.account,
              value: payment.chars,
            }))}
            placeholder="Pilih Jenis Transfer"
            label="Transfer"
            withAsterisk
          /> */}
          <TextInput
            placeholder="Masukkan Jenis Transfer"
            label="Transfer"
            withAsterisk
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            placeholder="Masukkan Persen Gaji"
            label="Persen Gaji"
            withAsterisk
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
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

export default PayrollForm;
