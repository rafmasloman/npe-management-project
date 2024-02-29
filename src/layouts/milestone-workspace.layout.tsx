import {
  Avatar,
  Badge,
  Divider,
  Group,
  Menu,
  Progress,
  Select,
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
import ButtonNavigate from '../components/button/button-link.component';
import { IconCircleFilled, IconEdit, IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { getCurrentRole } from '../utils/page.util';
import moment from 'moment';
import { ICDeadline } from '../assets/icons/deadlin.icon';
import Link from 'next/link';
import MilestoneStatusMenu from '../components/menu/milestone-status-menu.component';

interface IMilestoneSpaceProps {
  project: any;
}

const MilestoneSpace = ({ project }: IMilestoneSpaceProps) => {
  const { data: milestones } = useGetMilestonesByProject(project?.id);
  const [members, setMembers] = useState([]);

  const { pathname } = useRouter();

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

        <ButtonNavigate icon={<IconPlus />} url={`/milestone/add-milestone`}>
          Tambah Milestone
        </ButtonNavigate>
      </Group>

      <Space h={30} />

      <Stack spacing={30}>
        {milestones?.data?.map((milestone: IMilestoneProjectResponseData) => {
          console.log(milestone.status);

          return (
            <div
              key={milestone.id}
              className={`bg-white border-l-[12px] rounded-xl border border-gray-200 border-solid ${
                milestone.status === 'To Do'
                  ? 'border-l-todo'
                  : milestone.status === 'On Progress'
                  ? 'border-l-onprogress'
                  : 'border-l-success'
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

                <Badge
                  color={
                    milestone.status === 'To Do'
                      ? 'orange'
                      : milestone.status === 'On Progress'
                      ? 'indigo'
                      : 'green'
                  }
                >
                  {milestone.status}
                </Badge>
              </div>

              {/* <Divider /> */}

              <div className="flex items-center justify-between">
                <Group spacing={20}>
                  <Group spacing={10}>
                    <ICDeadline width={20} height={20} />
                    <Text>{moment(milestone.endDate).format('DD MMM YY')}</Text>
                  </Group>

                  <Divider
                    h={30}
                    w={3}
                    className="rounded-lg"
                    bg={COLORS.DEEPGRAY}
                  />

                  <Group spacing={10}>
                    <IconEdit width={18} height={18} color={COLORS.SECONDARY} />
                    <Link
                      href={`/milestone/${milestone.id}/edit-milestone`}
                      style={{
                        textDecoration: 'none',
                        color: COLORS.SECONDARY,
                      }}
                    >
                      <Text>Edit</Text>
                    </Link>
                  </Group>

                  <Divider
                    h={30}
                    w={3}
                    className="rounded-lg"
                    bg={COLORS.DEEPGRAY}
                  />

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
                    color={
                      milestone.status === 'On Progress'
                        ? 'indigo'
                        : milestone.status === 'Completed'
                        ? 'green'
                        : 'orange'
                    }
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
      </Stack>
    </div>
  );
};

export default MilestoneSpace;
