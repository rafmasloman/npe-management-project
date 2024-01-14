import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Menu,
  Modal,
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
import ProjectMenu from '../menu/project-menu.component';
import { useState } from 'react';
import ModalAction from '../modal/modal-action.component';
import { useDeleteProject } from '@/src/hooks/project/useDeleteProjectMutation';
import { IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { ICAlert } from '@/src/assets/icons/alert_delete.icon';


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
  const [isProjectMenuOpen, setProjectMenuOpen] = useState(false);

  const { mutate: deleteProject } = useDeleteProject();
  const [opened, { open, close }] = useDisclosure(false);

  const platformServices = platform
    .slice(1, -1)
    .split(', ')
    .map((item) => item.replace(/'/g, ''));

  const completedTask = task?.filter(
    (task) => task.status.toLowerCase() === 'Completed'.toLowerCase(),
  );

  const openModalConfirmationDelete = () => {
    open();
  };

  const handleDeleteProject = () => {
    deleteProject(projectId!);

    close();
  };

  console.log('projectId : ', projectId);

  const { pathname } = useRouter();

  return (
    <div className="relative  w-fit">
      <ModalAction
        headerText="Hapus Data Project?"
        message="Data yang telah dihapus tidak dapat dikembalikan"
        type="delete"
        opened={opened}
        close={close}
      >
        <Group mt={20}>
          <Button
            variant=""
            onClick={() => handleDeleteProject()}
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
      </ModalAction>



      <div className="absolute z-10 right-6 top-2.5 cursor-pointer">
        <ProjectMenu opened={isProjectMenuOpen} setOpened={setProjectMenuOpen}>
          <Menu.Item
            icon={<IconTrash size={20} color={COLORS.DANGER} />}
            className="text-red-500"
            onClick={openModalConfirmationDelete}
          >
            Hapus
          </Menu.Item>

          <Menu.Item
            icon={<IconPencil size={20} color={COLORS.SECONDARY} />}
            className="text-blue-950"
          >
            Edit
          </Menu.Item>
        </ProjectMenu>
      </div>

      <Link
        href={`/project/${projectId}/detail`}
        style={ListStyleDefaultTheme.default}
      >
        <Card
          className="w-[300px] mb-10 lg:md-0 "
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

              <Group mt={10}>
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
              <Text
                display={description ? 'block' : 'none'}
                color={COLORS.GRAY}
              >
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
    </div>
  );
};

export default ProjectCard;
