import { Box, rem, Group, Space, Stack, Text, Loader } from '@mantine/core';
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
  const {
    projectName,
    client,
    platform,
    endDate,
    description,
    members,
    priceDeals,
  } = projectDetail.projectDetail;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (projectDetail === undefined) {
      setIsLoading(true);
    }
  }, []);

  return (
    <Box
      bg={'white'}
      p={rem(30)}
      style={{
        borderRadius: '10px',
      }}
    >
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

      <Stack spacing={'30px'}>
        <SubDetail title="Member">
          {isLoading ? (
            <Loader />
          ) : (
            members?.map((member: IMemberProps) => {
              //   console.log('member' + member);
              return (
                <PersonCard key={member.id} name={member.name.split(' ')[0]} />
              );
            })
          )}
        </SubDetail>

        <SubDetail title="Client">
          {client?.map((client: { name: string }) => {
            return <PersonCard key={client.name} name={client.name} />;
          })}
        </SubDetail>

        <SubDetail title="Platform">
          {platform?.map((platform: IPlatformService, index: number) => {
            return (
              <Text
                key={platform.id}
                fz={'0.75rem'}
                bg={index % 2 === 0 ? COLORS.SECONDARY : COLORS.THIRD}
                px={10}
                py={4}
                color="white"
                style={{
                  borderRadius: '7px',
                }}
              >
                {platform.name.split(' ')[0]}
              </Text>
            );
          })}
        </SubDetail>

        <SubDetail title="Deadline">
          <Text color={COLORS.DANGER} fw={600}>
            {endDate}
          </Text>
        </SubDetail>

        <SubDetail title="Project Price">
          <Text fw={600}>Rp {priceDeals.toLocaleString('id-ID')}</Text>
        </SubDetail>
      </Stack>
    </Box>
  );
};

export default ProjectOverview;
