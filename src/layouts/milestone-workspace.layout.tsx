import {
  Avatar,
  Badge,
  Divider,
  Group,
  Progress,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
  rem,
} from '@mantine/core';
import { useGetMilestonesByProject } from '../hooks/milestone/useGetMilestoneByProject';
import { IMilestoneProjectResponseData } from '../interfaces/milestone.interface';
import ModalForm from '../components/modal/modal-form.component';
import { COLORS } from '../constant/colors.constant';
import { useEffect, useState } from 'react';
import { ICTask } from '../assets/icons/nav-icon/task.icon';

interface IMilestoneSpaceProps {
  project: any;
}

const MilestoneSpace = ({ project }: IMilestoneSpaceProps) => {
  const { data: milestones } = useGetMilestonesByProject(project?.id);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    milestones?.data?.map((milestone: any) => {
      setMembers(milestone.member);
    });
  }, [milestones?.data]);

  return (
    <div>
      <Space h={30} />

      <Group position="apart">
        <Title order={3}>Milestone Space</Title>

        <ModalForm title="Tambah Milestone" btnText="Tambah Milestone">
          <div></div>
        </ModalForm>
      </Group>

      <Space h={30} />

      {milestones?.data?.map((milestone: IMilestoneProjectResponseData) => {
        return (
          <div
            key={milestone.id}
            className={`bg-white border-l-[12px] rounded-xl border border-gray-200 border-solid ${
              milestone.status === 'TODO' ? 'border-l-todo' : ''
            }  py-5 pl-5 pr-12 flex flex-col gap-y-3.5`}
          >
            <div className="flex justify-between items-center">
              <Stack spacing={5}>
                <Text className="text-lg font-semibold text-blue-950">
                  {milestone.milestoneName}
                </Text>
                <Text className="text-gray-400 font-light">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Natus ab tenetur recusandae!
                </Text>
              </Stack>

              <Group className="border border-solid border-neutral-300 px-2.5 py-1.5 rounded-lg">
                <Avatar
                  size={25}
                  className="h-fit"
                  src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${project?.projectIcon}`}
                />
                <Text>{project?.projectName}</Text>
              </Group>
            </div>

            {/* <Divider /> */}

            <div className="flex items-center justify-between">
              <Group spacing={30}>
                <Badge
                  color={
                    milestone.status === 'TODO'
                      ? 'orange'
                      : milestone.status === 'ON_PROGRESS'
                      ? 'indigo'
                      : 'green'
                  }
                  size={'md'}
                >
                  {milestone.status}
                </Badge>
                <Group spacing={8} align="center">
                  <ICTask primaryColor={COLORS.GRAY} width={28} height={28} />
                  <Text className="text-gray-500">
                    {milestone.task.length} tasks
                  </Text>
                </Group>

                <Divider
                  h={30}
                  w={3}
                  className="rounded-lg"
                  bg={COLORS.DEEPGRAY}
                />

                <Progress
                  value={milestone.progress}
                  label={`${milestone.progress}%`}
                  radius={'lg'}
                  size={'lg'}
                  className="w-[300px] h-[18px]"
                  styles={{
                    label: {
                      fontSize: rem(12),
                      fontWeight: 500,
                    },
                  }}
                />
              </Group>

              <div className="flex flex-col gap-y-3.5">
                <Avatar.Group spacing={'md'}>
                  {members.map((member: any) => {
                    return (
                      <Tooltip
                        label={`${member.user?.firstname}`}
                        key={member.id}
                        color={'#93ACD6'}
                      >
                        <Avatar
                          src={member.profilePicture}
                          size={40}
                          radius={'xl'}
                          color={COLORS.PRIMARY}
                        >
                          {!member.profilePicture
                            ? `${member.user?.firstname.slice(
                                0,
                                1,
                              )}${member.user?.lastname.slice(0, 1)}`
                            : null}
                        </Avatar>
                      </Tooltip>
                    );
                  })}
                </Avatar.Group>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MilestoneSpace;
