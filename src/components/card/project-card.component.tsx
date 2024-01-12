import {
  Avatar,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
// import Image from 'next/image';
import KartjisLogo from '@/src/assets/illustration/kartjis.png';
import { IProjectCardProps } from '@/src/interfaces/project.interface';
import ImageNext from 'next/image';
import { ICDeadline } from '@/src/assets/icons/deadlin.icon';
import { COLORS } from '@/src/constant/colors.constant';
import Link from 'next/link';
import { ListStyleDefaultTheme } from '@/src/themes/general.theme';
import { useRouter } from 'next/router';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
const ProjectCard = ({
  platform,
  projectName,
  deadline,
  description,
  width,
  height,
  projectIcon,
  member,
  task,
  projectId,
}: IProjectCardProps) => {
  console.log('projectId : ', projectId);

  const platformServices = platform
    .slice(1, -1)
    .split(', ')
    .map((item) => item.replace(/'/g, ''));

  const completedTask = task?.filter(
    (task) => task.status.toLowerCase() === 'Completed'.toLowerCase(),
  );

  console.log('member : ', member);

  const { pathname } = useRouter();

  return (
    <Link
      href={`/project/${projectId}/detail`}
      style={ListStyleDefaultTheme.default}
    >
      <Card
        className="w-[300px] mb-10 lg:md-0"
        // w={300}
        h={height}
        radius={'lg'}
        shadow="lg"
        p={24}
      >
        <Flex direction={'column'} gap={'xl'}>
          <Group position="apart">
            <Image
              src={`${
                process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL
              }/projects/${projectIcon!}`}
              alt="Project Logo"
              width={40}
              height={60}
            />

            <Group>
              {platformServices.map((platform, index) => {
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
            </Group>
          </Group>
          <Stack>
            <Text fz={'1.75rem'} fw={600}>
              {projectName}
            </Text>
            <Text display={description ? 'block' : 'none'} color={COLORS.GRAY}>
              {description}
            </Text>
            <Text>
              Task Done :{' '}
              <span style={{ color: COLORS.SUCCESS }}>
                {completedTask?.length}
              </span>
              /{task?.length}
            </Text>
          </Stack>
          <Group position="apart">
            {/* <Group>
          {member.map((m) => {
            return <Avatar key={m.id} radius={'xl'} size={30} />;
          })}
        </Group> */}

            <Group style={{ position: 'relative' }}>
              {member?.map((m, index) => {
                index *= 3;
                return (
                  <Tooltip key={m.id} label={m.user?.fullname}>
                    <Avatar
                      style={{ zIndex: index }}
                      radius={'xl'}
                      size={30}
                      src={`${
                        m.profilePicture === undefined
                          ? ''
                          : process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL
                      }/members/${m?.profilePicture}`}
                    />
                  </Tooltip>
                );
              })}
              {/* <Tooltip>
              <Avatar
                style={{ zIndex: 3 }}
                radius={'xl'}
                size={30}
                src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${member?.profilePicture}`}
              />
              </Tooltip>
              <Avatar
                style={{ position: 'absolute', left: 16, zIndex: 2 }}
                radius={'xl'}
                size={30}
              />
              <Avatar
                style={{ position: 'absolute', left: 32, zIndex: 1 }}
                radius={'xl'}
                size={30}
              /> */}
            </Group>

            <Group spacing={'sm'}>
              <ICDeadline width={20} height={20} />
              <Text color="red" fz={'0.875rem'}>
                {/* {deadline.split(' ')[0]} days left */}
              </Text>
            </Group>
          </Group>
        </Flex>
      </Card>
    </Link>
  );
};

export default ProjectCard;
