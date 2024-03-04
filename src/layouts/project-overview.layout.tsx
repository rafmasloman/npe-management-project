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
  Title,
  Divider,
  Avatar,
  RingProgress,
  SimpleGrid,
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
import { formattedDate } from '../utils/date.util';
import PayrollForm from '../components/form/payroll/payroll.form.component';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { IconCircleFilled } from '@tabler/icons-react';
import moment from 'moment';
import { useCountStatusTaskData } from '../hooks/task/useTotalTaskData';
import CrewCard from '../components/card/crew-card.component';

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
  const [projectManager, setProjectManager] = useState([]);

  const {
    totalTodo,
    totalProgress,
    totalCompleted,
    totalTaskCompletedPercent,
  } = useCountStatusTaskData(projectDetail?.projectDetail?.task);

  const taskPercentage = (total: number) => {
    const countPercentage =
      (total / projectDetail?.projectDetail?.task.length) * 100;

    return countPercentage;
  };

  useEffect(() => {
    if (projectDetail === undefined) {
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    const getProjectManager = () => {
      const projectManager = projectDetail?.projectDetail?.member?.filter(
        (member: any) => {
          return member.position === 'Project Manager';
        },
      );

      setProjectManager(projectManager);
    };

    getProjectManager();
  }, [projectDetail?.projectDetail?.member]);

  return (
    <>
      <Space h={'xl'} />

      <Title order={2}>Summary</Title>

      <Space h={30} />

      <div className="gap-10 relative flex items-center px-7 py-0 border  border-solid border-gray-200 shadow-sm rounded-2xl bg-white h-72">
        <div className="w-10 h-2 bg-[#00D1FF] absolute top-7 right-10 rounded-lg"></div>

        {projectManager?.map((manager: any) => {
          return (
            <Stack
              key={manager?.id}
              spacing={40}
              className="h-full"
              justify="center"
            >
              <Group className="bg-neutral-100  px-3 py-2.5 rounded-xl">
                <Avatar
                  src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${manager?.profilePicture}`}
                  size={40}
                  radius={'xl'}
                />

                <div>
                  <Text className="text-black">
                    {manager?.user?.firstname} {manager?.user?.lastname}
                  </Text>

                  <Text className="text-sm text-neutral-400">
                    {manager?.position}
                  </Text>
                </div>
              </Group>

              <Stack spacing={12}>
                <div className="flex justify-between gap-14">
                  <Text className="text-gray-400 ">Project</Text>
                  <Text>{projectDetail?.projectDetail?.projectName}</Text>
                </div>
                <div className="flex justify-between gap-14">
                  <Text className="text-gray-400 ">Harga Project</Text>
                  <Text className="">
                    Rp{' '}
                    {projectDetail?.projectDetail?.price.toLocaleString(
                      'id-ID',
                    )}
                  </Text>
                </div>

                <div className="flex justify-between gap-14">
                  <Text className="text-gray-400 ">Deadline</Text>
                  <Text className="text-red-500 font-medium">
                    {moment(projectDetail?.projectDetail?.endDate).format(
                      'DD MMMM YYYY',
                    )}
                  </Text>
                </div>
              </Stack>
            </Stack>
          );
        })}

        <Divider w={2} h={'100%'} className="bg-neutral-200" />

        <Group spacing={50} align="center" position="center">
          <div className="w-fit h-fit flex justify-center items-center">
            {projectDetail?.projectDetail?.task.length <= 0 ? (
              <div className="bg-neutral-300 w-full h-full rounded-[100%] flex justify-center items-center">
                <Text className="text-lg text-neutral-500">Belum ada task</Text>
              </div>
            ) : (
              <RingProgress
                size={200}
                thickness={20}
                label={
                  <Text
                    className="text-xl font-medium"
                    align="center"
                    px="xs"
                    sx={{ pointerEvents: 'none' }}
                  >
                    {totalTaskCompletedPercent}%
                  </Text>
                }
                sections={[
                  {
                    value: taskPercentage(totalTodo),
                    color: 'orange',
                    tooltip: <Text>{`To Do ${totalTodo}`}</Text>,
                  },
                  {
                    value: taskPercentage(totalProgress),
                    color: 'indigo',
                    tooltip: <Text>{`On Progress ${totalProgress}`}</Text>,
                  },
                  {
                    value: taskPercentage(totalCompleted),
                    color: 'green',
                    tooltip: <Text>{`Completed ${totalCompleted}`}</Text>,
                  },
                ]}
              />
            )}
          </div>

          <div>
            <Group
              className="border-2 border-solid border-gray-200 py-1.5  rounded-lg"
              position="center"
              spacing={10}
            >
              <Avatar
                src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${projectDetail?.projectDetail?.projectIcon}`}
                size={20}
                className="h-fit"
              />
              <Text className="text-base font-medium">
                {projectDetail?.projectDetail?.projectName}
              </Text>
            </Group>

            <Space h={20} />

            <Group position="apart" spacing={35}>
              <Text className="text-lg font-semibold">Task status</Text>
              <Text>{totalTaskCompletedPercent}% completed</Text>
            </Group>

            <Space h={20} />
            <Stack spacing={16} align="start" className="">
              <div className="flex items-center justify-between w-full">
                <div className="flex justify-center items-center gap-2">
                  <IconCircleFilled style={{ color: COLORS.TODO }} size={16} />
                  <Text>To Do</Text>
                </div>

                <Text>{totalTodo} task</Text>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex justify-center items-center gap-2">
                  <IconCircleFilled
                    style={{ color: COLORS.ON_PROGRESS }}
                    size={16}
                  />
                  <Text>On Progress</Text>
                </div>

                <Text>{totalProgress} task</Text>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex justify-center items-center gap-2">
                  <IconCircleFilled
                    style={{ color: COLORS.COMPLETED }}
                    size={16}
                  />
                  <Text>Completed</Text>
                </div>

                <Text>{totalCompleted} task</Text>
              </div>
            </Stack>
          </div>
        </Group>
      </div>

      <Space h={30} />

      <Title order={2}>Crew</Title>

      <SimpleGrid
        breakpoints={[
          { cols: 1, minWidth: 'sm' },
          { cols: 2, minWidth: 'md' },
          { cols: 3, minWidth: 'lg' },
        ]}
      >
        {projectDetail?.projectDetail?.member?.map((crew: any) => {
          return (
            <CrewCard
              key={crew.id}
              id={crew.id}
              name={`${crew?.user?.firstname} ${crew?.user?.lastname}`}
              position={crew?.position}
              profilePicture={`${
                process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL
              }/members/${crew?.profilePicture!}`}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default ProjectOverview;
