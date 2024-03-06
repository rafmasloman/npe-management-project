import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Menu,
  Modal,
  SimpleGrid,
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
import ProjectMenu from '../menu/action-menu.component';
import { useState } from 'react';
import ModalAction from '../modal/modal-action.component';
import { useDeleteProject } from '@/src/hooks/project/useDeleteProjectMutation';
import { IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { ICAlert } from '@/src/assets/icons/alert_delete.icon';
import ActionMenu from '../menu/action-menu.component';
import moment from 'moment';

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
  const { pathname } = useRouter();

  const platformServices = platform?.split(',');

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

  console.log('deadline : ', platformServices);

  return (
    <div className="relative w-full  lg:w-[350px] ">
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
        <ActionMenu
          position="bottom"
          opened={isProjectMenuOpen}
          setOpened={setProjectMenuOpen}
        >
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
            component="a"
            href={`/project/edit-project/${projectId}`}
          >
            Edit
          </Menu.Item>
        </ActionMenu>
      </div>

      <Link
        href={`/project/${projectId}/detail`}
        style={ListStyleDefaultTheme.default}
      >
        <Card
          className="w-full mb-10 lg:md-0 border border-solid border-transparent hover:border hover:border-solid hover:border-sky-800"
          // w={300}
          h={height}
          radius={'lg'}
          shadow="lg"
          p={24}
        >
          <Flex
            direction={'column'}
            gap={'xl'}
            className="h-full justify-between"
          >
            <Group position="apart" align="center">
              <Avatar
                src={`${
                  process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL
                }/projects/${projectIcon!}`}
                alt="Project Logo"
                size={50}
                className="h-fit"
              />

              <Grid mt={10}>
                {platformServices.map((platform, index) => {
                  return (
                    <Grid.Col
                      span={platformServices.length > 1 ? 6 : 12}
                      key={index}
                    >
                      <Box
                        className="text-xs text-center px-2.5 py-0.5"
                        bg={index % 2 === 0 ? COLORS.THIRD : COLORS.SECONDARY}
                        style={{
                          borderRadius: '7px',
                        }}
                      >
                        <Text color="white">{platform}</Text>
                      </Box>
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Group>
            <Stack>
              <Text fz={'1.75rem'} fw={600}>
                {projectName}
              </Text>
              <Text color={COLORS.GRAY} className="line-clamp-3">
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
                <Avatar.Group spacing={'sm'}>
                  {member?.map((m, index) => {
                    return (
                      <Tooltip
                        key={m.id}
                        label={`${m.user?.firstname} ${m.user?.lastname}`}
                      >
                        <Avatar
                          style={{ zIndex: index }}
                          radius={'xl'}
                          size={32}
                          src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${m?.profilePicture}`}
                          className="border border-solid border-gray-300"
                        />
                      </Tooltip>
                    );
                  })}
                </Avatar.Group>
              </Group>

              <Stack spacing={5}>
                <Text className="text-xs md:text-sm">Deadline</Text>
                <Group spacing={'sm'}>
                  <ICDeadline width={20} height={20} />
                  <Text color="red" className="text-xs md:text-sm">
                    {moment(deadline).format('DD MMM YYYY')}
                  </Text>
                </Group>
              </Stack>
            </Group>
          </Flex>
        </Card>
      </Link>
    </div>
  );
};

export default ProjectCard;
