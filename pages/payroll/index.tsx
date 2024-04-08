import { ICAlert } from '@/src/assets/icons/alert_delete.icon';
import { ICPayroll } from '@/src/assets/icons/nav-icon/payroll.icon';
import SEO from '@/src/components/SEO/seo.component';
import ButtonNavigate from '@/src/components/button/button-link.component';
import NoDataCard from '@/src/components/card/no_data-card.component';
import HeaderPage from '@/src/components/header/header-page.component';
import Table from '@/src/components/table/table.component';
import { COLORS } from '@/src/constant/colors.constant';
import { useDeletePayroll } from '@/src/hooks/payroll/useDeletePayrollMutation';
import { useGetPayrollQuery } from '@/src/hooks/payroll/useGetPayrollsQuery';
import { useModal } from '@/src/hooks/useModal';
import TableLayout from '@/src/layouts/form/table.layout';
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
import { IconCircleFilled, IconPlus, IconX } from '@tabler/icons-react';
import { IconPencilCode, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const AdminPayroll = () => {
  const { pathname } = useRouter();

  const { data: payrolls } = useGetPayrollQuery();
  const { mutate: deletePayroll } = useDeletePayroll();
  const [isPayrollAvaiable, setIsPayrollAvaiable] = useState(false);

  const { opened, open, close, itemId, handleConfirm } = useModal();

  const tableHead = [
    { title: 'Name' },
    { title: 'Position' },
    { title: 'Percent' },
    { title: 'Salary' },
    { title: 'Status' },
    { title: 'Project' },
    { title: 'Action' },
  ];

  const handleDelete = () => {
    deletePayroll(itemId);
    close();
  };

  useEffect(() => {
    if (payrolls?.data?.length > 0) {
      setIsPayrollAvaiable(!isPayrollAvaiable);
    }
  }, [payrolls, isPayrollAvaiable]);

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

        <Space h={50} />

        <TableLayout
          layoutTitle={`${payrolls?.data?.length} Payroll`}
          addUrl="/add-payroll"
          icon={<ICPayroll width={30} height={30} />}
        >
          {!isPayrollAvaiable ? (
            <Box className="flex justify-center">
              <NoDataCard
                icon={<ICPayroll width={50} height={50} />}
                description="Untuk memberikan persen keuntungan kepada anggota tim yang terlibat, tambahkan payroll terlebih dahulu"
                title="Payroll"
              >
                <ButtonNavigate
                  icon={<IconPlus />}
                  url={`/${getCurrentPage(pathname)}/add-payroll`}
                >
                  Tambah Payroll
                </ButtonNavigate>
              </NoDataCard>
            </Box>
          ) : (
            <>
              <Table
                tableHead={tableHead}
                tableRow={payrolls?.data?.map((payroll: any) => {
                  return (
                    <tr key={payroll.id} className="">
                      <td className=" md:w-1/5 ">
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

                          <Text className="text-left">
                            {`${payroll.member?.user?.firstname} ${payroll.member?.user?.lastname}`}
                          </Text>
                        </div>
                      </td>
                      <td className="md:w-1/6  ">{`${payroll.member?.position}`}</td>
                      <td className="">{payroll.percent} %</td>
                      <td className=" ">{payroll.salary}</td>
                      <td className="md:w-1/6">
                        <div className="flex items-center gap-2.5">
                          <IconCircleFilled
                            size={10}
                            style={{
                              color:
                                payroll.payrollStatus === 'PAID'
                                  ? COLORS.SUCCESS
                                  : COLORS.ON_PROGRESS,
                            }}
                          />
                          {payroll.payrollStatus === 'PAID'
                            ? 'Sudah Dibayar'
                            : 'Belum Dibayar'}
                        </div>
                      </td>
                      <td className="md:w-1/6 ">
                        <div className="flex flex-row items-center gap-2.5">
                          <Avatar
                            radius={'xl'}
                            size={20}
                            className="w-2 h-fit"
                            src={
                              !payroll.project.projectIcon
                                ? ''
                                : `${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${payroll.project?.projectIcon}`
                            }
                          />

                          <Text className="text-left">
                            {`${payroll.project?.projectName}`}
                          </Text>
                        </div>
                      </td>
                      <td className=" ">
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

              <Space h={30} />

              <div className="flex justify-center ">
                <Pagination total={10} />
              </div>
            </>
          )}
        </TableLayout>
      </Container>
    </MainLayout>
  );
};

export default AdminPayroll;
