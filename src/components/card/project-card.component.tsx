import { Avatar, Box, Card, Flex, Group, Stack, Text } from '@mantine/core';
// import Image from 'next/image';
import KartjisLogo from '@/src/assets/illustration/kartjis.png';
import { IProjectCardProps } from '@/src/interfaces/project.interface';
import ImageNext from 'next/image';
import { ICDeadline } from '@/src/assets/icons/deadlin.icon';
import Image from 'next/image';
import { COLORS } from '@/src/constant/colors.constant';
import Link from 'next/link';
import { ListStyleDefaultTheme } from '@/src/themes/general.theme';
import { useRouter } from 'next/router';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
const ProjectCard = ({
  tag,
  projectName,
  taskComplete,
  tasks,
  deadline,
  description,
  width,
  height,
}: IProjectCardProps) => {
  const { pathname } = useRouter();
  return (
    <Link
      href={`/${getCurrentRole(pathname)}/project/1/detail`}
      style={ListStyleDefaultTheme.default}
    >
      <Card w={width} h={height} radius={'lg'} shadow="lg" p={24}>
        <Flex direction={'column'} gap={'xl'}>
          <Group position="apart">
            <Image
              src={KartjisLogo.src}
              alt="Project Logo"
              width={40}
              height={45}
            />

            <Group>
              {tag.map((t, index) => {
                // console.log(index);
                return (
                  <Text
                    key={t.id}
                    fz={'0.75rem'}
                    bg={index % 2 === 0 ? COLORS.SECONDARY : COLORS.THIRD}
                    px={10}
                    py={4}
                    color="white"
                    style={{
                      borderRadius: '7px',
                    }}
                  >
                    {t.name.split(' ')[0]}
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
              <span style={{ color: COLORS.SUCCESS }}>{taskComplete}</span>/
              {tasks}
            </Text>
          </Stack>
          <Group position="apart">
            {/* <Group>
          {member.map((m) => {
            return <Avatar key={m.id} radius={'xl'} size={30} />;
          })}
        </Group> */}

            <Group style={{ position: 'relative' }}>
              <Avatar style={{ zIndex: 3 }} radius={'xl'} size={30} />
              <Avatar
                style={{ position: 'absolute', left: 16, zIndex: 2 }}
                radius={'xl'}
                size={30}
              />
              <Avatar
                style={{ position: 'absolute', left: 32, zIndex: 1 }}
                radius={'xl'}
                size={30}
              />
            </Group>

            <Group spacing={'sm'}>
              <ICDeadline width={20} height={20} />
              <Text color="red" fz={'0.875rem'}>
                {deadline.split(' ')[0]} days left
              </Text>
            </Group>
          </Group>
        </Flex>
      </Card>
    </Link>
  );
};

export default ProjectCard;
