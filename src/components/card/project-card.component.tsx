import { Avatar, Box, Card, Flex, Group, Stack, Text } from '@mantine/core';
// import Image from 'next/image';
import KartjisLogo from '@/src/assets/illustration/kartjis.png';
import { IProjectCardProps } from '@/src/interfaces/project.interface';
import ImageNext from 'next/image';
import { ICDeadline } from '@/src/assets/icons/deadlin.icon';
import Image from 'next/image';
import { COLORS } from '@/src/constant/colors.constant';
const ProjectCard = ({
  tag,
  projectName,
  taskComplete,
  tasks,
  member,
  deadline,
}: IProjectCardProps) => {
  console.log(KartjisLogo);
  return (
    <Card w={270} h={250} radius={'lg'} shadow="lg">
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
              console.log(index);
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
          <Text>
            Task Done : {taskComplete}/{tasks.length}
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
  );
};

export default ProjectCard;
