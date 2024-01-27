import { COLORS } from '@/src/constant/colors.constant';
import {
  Button,
  FileInput,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Select,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { IconFilePlus, IconFileTypeDoc, IconPlus } from '@tabler/icons-react';
import * as Yup from 'yup';
import { useQuery, useMutation } from '@tanstack/react-query';
import UserQueryApi from '@/pages/api/user/user-query';
import UserMutationApi from '@/pages/api/user/user-mutation';
import { useEffect, useState } from 'react';
import { IApiCreatePostUserMutationParams } from '@/src/interfaces/api/user/user-api.interface';
import { usePostUser } from '@/src/hooks/user/usePostUser';
import { useRouter } from 'next/router';
import { ROUTES } from '@/src/constant/routes.constant';
import { usePostClientMutation } from '@/src/hooks/client/usePostClient';
import { useGetProjectQuery } from '@/src/hooks/project/useGetProjectQuery';
import { IClientInitialValuesParams } from '@/src/interfaces/client.interface';
import { usePutClientMutation } from '@/src/hooks/client/usePutClient';
import { invoiceFormSchema } from './invoice.schema';
import { IInvoiceDataParams } from '@/src/interfaces/invoice.interface';
import { usePostInvoiceMutation } from '@/src/hooks/invoices/usePostInvoice';
import { usePutInvoiceMutation } from '@/src/hooks/invoices/usePutInvoices';
import { useGetClientsQuery } from '@/src/hooks/client/useGetClient';

interface IInvoiceInitialValueParams {
  initialValues?: IInvoiceDataParams;
}

interface IClientOptionValueTypes {
  value: string;
  label: string;
}

const InvoiceForm = ({ initialValues }: IInvoiceInitialValueParams) => {
  const { mutate: createInvoice, isPending } = usePostInvoiceMutation();
  const {
    mutate: updateInvoice,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = usePutInvoiceMutation();

  const { data: clients, isSuccess } = useGetClientsQuery();

  const [clientsOption, setClientsOption] = useState<IClientOptionValueTypes[]>(
    [],
  );

  const { query } = useRouter();

  const form = useForm({
    validate: yupResolver(invoiceFormSchema),
    initialValues: {
      invoicesTitle: initialValues?.invoicesTitle || '',
      otherInfo: initialValues?.otherInfo || '',
      clientId: initialValues?.clientId || '',
    },
  });

  useEffect(() => {
    if (!isSuccess) {
      setClientsOption([]);
    } else {
      const client = clients?.data?.map((client: any) => {
        return {
          value: client.id,
          label: client.name,
        };
      });
      setClientsOption(client);
    }
  }, [clients, isSuccess]);

  const handleSubmit = form.onSubmit((values) => {
    const params = {
      invoicesTitle: values.invoicesTitle,
      otherInfo: values.otherInfo,
      clientId: values.clientId,
    };

    console.log('params : ', params);

    if (!initialValues) {
      console.log('success create : ');

      createInvoice(params);
    } else if (!!initialValues) {
      console.log('success update : ');
      updateInvoice({ invoiceId: query.id as string, payload: params });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid gutter={'xl'}>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            placeholder="Masukkan Judul Invoice"
            label="Invoice"
            radius={'md'}
            {...form.getInputProps('invoicesTitle')}
            styles={{
              input: {
                padding: 24,
                marginTop: 10,
              },
            }}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            label="Clients"
            placeholder="Pilih Client"
            data={clientsOption}
            {...form.getInputProps('clientId')}
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Textarea
            label={
              <Group spacing={5}>
                <Text>Info Tambahan</Text>
                <Text className="text-xs text-gray-400"> {'(Optional)'}</Text>
              </Group>
            }
            placeholder="Masukkan Info Tambahan"
            {...form.getInputProps('otherInfo')}
          />
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Group position="right">
            <Button
              type="submit"
              loading={isPending}
              bg={COLORS.PRIMARY}
              leftIcon={<IconPlus />}
            >
              {!query.id ? 'Tambah Invoice' : 'Update Invoice'}
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default InvoiceForm;
