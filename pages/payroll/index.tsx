import { ICAlert } from '@/src/assets/icons/alert_delete.icon';
import SEO from '@/src/components/SEO/seo.component';
import ButtonNavigate from '@/src/components/button/button-link.component';
import HeaderPage from '@/src/components/header/header-page.component';
import Table from '@/src/components/table/table.component';
import { COLORS } from '@/src/constant/colors.constant';
import { useDeletePayroll } from '@/src/hooks/payroll/useDeletePayrollMutation';
import { useGetPayrollQuery } from '@/src/hooks/payroll/useGetPayrollsQuery';
import { useModal } from '@/src/hooks/useModal';
import MainLayout from '@/src/layouts/main.layout';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Modal,
  Pagination,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconX } from '@tabler/icons-react';
import { IconPencilCode, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const AdminPayroll = () => {
  const { pathname } = useRouter();

  const { data: payrolls } = useGetPayrollQuery();
  const { mutate: deletePayroll } = useDeletePayroll();

  const { opened, open, close, itemId, handleConfirm } = useModal();

  const tableHead = [
    { title: 'Name' },
    { title: 'Position' },
    { title: 'Salary' },
    { title: 'Provider' },
    { title: 'Status' },
    { title: 'Action' },
  ];

  const handleDelete = () => {
    deletePayroll(itemId);
    close();
  };

  return (
    <MainLayout>
      <SEO title="Payroll" description="Halaman untuk payroll para staff" />

      <Modal
        opened={opened}
        onClose={close}
        // title="Hapus User"
        withCloseButton={false}
        overlayProps={{
          // color:
          //   theme.colorScheme === 'dark'
          //     ? theme.colors.dark[9]
          //     : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        radius={'lg'}
        styles={{
          body: {
            padding: 20,
          },
        }}
      >
        <div className="flex  justify-between ">
          <Stack spacing={0}>
            <Group>
              <ICAlert width={30} height={30} />
              <Text className="text-xl font-semibold">Hapus Data Payroll?</Text>
            </Group>
            <Text className="text-sm text-gray-400 mt-2.5">
              Data yang telah dihapus tidak dapat dikembalikan
            </Text>
          </Stack>

          <IconX className="text-gray-400 hover:text-black" onClick={close} />
        </div>

        <Group mt={20}>
          <Button
            variant=""
            onClick={() => handleDelete()}
            w={'48%'}
            // loading={isLoading}
            radius={'md'}
            c={'white'}
            bg={COLORS.DANGER}
            // disabled={disableNoButton}
          >
            Hapus
          </Button>
          <Button
            // loading={isLoading}
            onClick={close}
            variant="outline"
            w={'48%'}
            radius={'md'}
            c={'red'}
            color="red"
          >
            Batal
          </Button>
        </Group>
      </Modal>

      <Container size={'lg'}>
        <HeaderPage
          pageTitle={getCurrentPage(pathname)}
          role={getCurrentRole(pathname)}
        />

        {/* <Stack className="w-full">
          <Grid className="" gutter={120}>
            <Grid.Col span={1}>
              <h4>No.</h4>
            </Grid.Col>

            <Grid.Col span={3}>
              <h4>Member</h4>
            </Grid.Col>

            <Grid.Col span={3}>
              <h4>Position</h4>
            </Grid.Col>

            <Grid.Col span={1}>
              <h4>Provider</h4>
            </Grid.Col>

            <Grid.Col span={1}>
              <h4>Status</h4>
            </Grid.Col>

            <Grid.Col span={2}>
              <h4>Project</h4>
            </Grid.Col>
          </Grid>

          <Grid className="" gutter={120}>
            <Grid.Col span={1}>
              <p>1</p>
            </Grid.Col>

            <Grid.Col span={3}>
              <p>Rafly Masloman</p>
            </Grid.Col>

            <Grid.Col span={3}>
              <p>Frontend Developer</p>
            </Grid.Col>

            <Grid.Col span={1}>
              <p>BRI</p>
            </Grid.Col>

            <Grid.Col span={1}>
              <p>Unpaid</p>
            </Grid.Col>

            <Grid.Col span={2}>
              <div className="flex justify-center items-center">
                <Avatar />
                <p>Kartjis</p>
              </div>
            </Grid.Col>
          </Grid>
        </Stack> */}

        <Space h={50} />

        <div className="w-full bg-white py-8 rounded-2xl border border-solid border-gray-200">
          <Group
            align="center"
            position="apart"
            className="border-b-2 border-0 border-solid border-gray-300 px-8 pb-5"
          >
            <Text className="text-blue-950 text-lg font-semibold ">
              {payrolls?.data?.length} Payroll
            </Text>

            <ButtonNavigate
              icon={<IconPlus />}
              url={`/${getCurrentRole(pathname)}/add-payroll`}
            >
              Tambah Payroll
            </ButtonNavigate>
          </Group>

          <Space h={35} />

          <div className="px-8 overflow-x-scroll lg:overflow-x-hidden">
            <Table
              tableHead={tableHead}
              tableRow={payrolls?.data?.map((payroll: any) => {
                return (
                  <tr key={payroll.id} className="">
                    <td className=" md:w-1/5  ">
                      <div className="flex flex-row items-center gap-5">
                        <Avatar
                          radius={'xl'}
                          size={36}
                          src={
                            !payroll.member.profilePicture
                              ? ''
                              : `${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${payroll.member?.profilePicture}`
                          }
                        />

                        {/* <div
                        className=" bg-red-500 rounded-full"
                        style={{
                          backgroundImage: `url('http://localhost:5000/api/v1/files/download/members/Group 48095518 (2).png')`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '100% 100%',
                          backgroundPosition: 'top',
                          width: '50px',
                          height: '30px',
                        }}
                      ></div> */}
                        <Text className="text-left">
                          {`${payroll.member?.user?.firstname} ${payroll.member?.user?.lastname}`}
                        </Text>
                      </div>
                    </td>
                    <td className="md:w-1/5  ">{`${payroll.member?.position}`}</td>
                    <td className="md:w-1/6 ">{payroll.salary}</td>
                    <td className=" ">{payroll.transactionProvider}</td>
                    <td className="md:w-1/6 ">{payroll.payrollStatus}</td>
                    <td className="md:w-1/6 ">
                      <Group position="left">
                        <ActionIcon
                          variant="outline"
                          radius={'xl'}
                          color={'red'}
                          c={COLORS.DANGER}
                          opacity={'0.7'}
                          size={'lg'}
                          onClick={() => handleConfirm(payroll.id)}
                        >
                          <IconTrash size={'1.125rem'} />
                        </ActionIcon>

                        <ActionIcon
                          variant="outline"
                          radius={'xl'}
                          color={'gray'}
                          c={COLORS.SECONDARY}
                          opacity={'0.7'}
                          size={'lg'}
                          // onClick={() => {
                          //   replace(`/admin/payroll-management/${user.id}/edit-user`);
                          // }}
                        >
                          <IconPencilCode size={'1.125rem'} />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                );
              })}
            />
          </div>

          <div className="flex justify-center ">
            <Pagination total={10} />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default AdminPayroll;
