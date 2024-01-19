import {
  Box,
  rem,
  Group,
  Space,
  Stack,
  Text,
  Loader,
  Flex,
  Card,
} from '@mantine/core';
import PersonCard from '../components/card/person-card.component';
import SubDetail from '../components/project/project-sub-detail.component';
import { COLORS } from '../constant/colors.constant';
import Image from 'next/image';
import KartjisLogo from '@/src/assets/illustration/kartjis.png';
import { projects } from '@/pages/api/dummy/project.dummy.api';
import { useRouter } from 'next/router';
import { ITaskProps } from '../interfaces/task.interface';
import { IMemberProps } from '../interfaces/member.interface';
import { IPlatformService } from '../interfaces/platform.interface';
import { useEffect, useState } from 'react';
import ModalForm from '../components/modal/modal-form.component';
import PayrollForm from '../components/form/payroll.form.component';

interface IProjectDetailResponse {
  id: number;
  projectName: string;
  client: {
    name: string;
  }[];
  platform: IPlatformService[];
  startedDate: string;
  endDate: string;
  members: IMemberProps[];
  //   tasks: ITaskProps[];
  description: string;
}

const ProjectOverview = (projectDetail: any) => {
  const [isLoading, setIsLoading] = useState(false);

  console.log(projectDetail?.projectDetail?.platform);

  const platformServices = projectDetail?.projectDetail?.platform
    .slice(1, -1)
    .split(', ')
    .map((item: any) => item.replace(/'/g, ''));

  useEffect(() => {
    if (projectDetail === undefined) {
      setIsLoading(true);
    }
  }, []);

  return (
    <>
      {/* <ModalForm btnText="Invite Member" title="Invite Member to Project">
        <PayrollForm />
      </ModalForm> */}

      <Space h={'xl'} />
      <Card withBorder radius={'lg'} shadow="sm" bg={'white'} p={rem(30)}>
        {/* <Group spacing={'xl'}>
        <Image
          src={KartjisLogo.src}
          alt={'Project Showcase'}
          width={60}
          height={100}
        />

        <Text fz={'2.5rem'} fw={600}>
          {projectName!}
        </Text>

        <Text w={'100%'}>
          Website bagi yang ingin membuat Event mereka sendiri, mengelola dan
          monitoring penjualan tiket secara real-time untuk Event konser, serta
          melakukan manajemen data pengunjung yang hadir ke event dan laporan
          penjualan tiket konser
        </Text>
      </Group> */}

        {/* <Space h={50} /> */}

        <Flex direction={'column'} gap={30}>
          <SubDetail title="Member">
            {isLoading ? (
              <Loader />
            ) : (
              projectDetail?.projectDetail?.member?.map((member: any) => {
                return (
                  <PersonCard
                    key={member.id}
                    name={member.user?.fullname!}
                    image={`${
                      process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL
                    }/members/${member.profilePicture!}`}
                  />
                );
              })
            )}
            <ModalForm
              btnText="Invite Member"
              title="Invite Member to Project"
              variant="outline"
              colorBtn={'transparant'}
            >
              <PayrollForm />
            </ModalForm>
          </SubDetail>

          {/* <SubDetail title="Client">
            {client?.map((client: { name: string }) => {
              return <PersonCard key={client.name} name={client.name} />;
            })}
          </SubDetail> */}

          <SubDetail title="Platform">
            {platformServices?.map((platform: any, index: number) => {
              return (
                <Text
                  key={platform}
                  fz={'0.75rem'}
                  bg={index % 2 === 0 ? COLORS.SECONDARY : COLORS.THIRD}
                  px={10}
                  py={4}
                  color="white"
                  style={{
                    borderRadius: '7px',
                  }}
                >
                  {platform}
                </Text>
              );
            })}
          </SubDetail>

          <SubDetail title="Deadline">
            <Text color={COLORS.DANGER} fw={600}>
              {projectDetail?.projectDetail?.endDate}
            </Text>
          </SubDetail>

          <SubDetail title="Project Price">
            <Text fw={600}>
              Rp {projectDetail?.projectDetail?.price?.toLocaleString('id-ID')}
            </Text>
          </SubDetail>
        </Flex>
      </Card>
    </>
  );
};

export default ProjectOverview;
