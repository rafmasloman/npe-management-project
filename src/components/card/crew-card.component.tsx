import { useDeleteMemberFromProject } from '@/src/hooks/project/useDeleteMemberFromProject';
import {
  Avatar,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Notifications from '../notifications/notification.component';
import ModalAction from '../modal/modal-action.component';
import { useDisclosure } from '@mantine/hooks';
import { COLORS } from '@/src/constant/colors.constant';
import { useRouter } from 'next/router';

interface IMemberCardPropsType {
  id: string;
  name: string;
  position: string;
  phoneNumber?: string;
  profilePicture: string;
}

const CrewCard = ({
  id,
  name,
  phoneNumber,
  position,
  profilePicture,
}: IMemberCardPropsType) => {
  const [memberId, setMemberId] = useState<string>('');

  const { query } = useRouter();

  const [
    openedDeleteConfirmation,
    { open: openModalDelete, close: closeModalDelete },
  ] = useDisclosure(false);

  const { mutate: removeMember, isPending } = useDeleteMemberFromProject({
    onSuccess() {
      Notifications({
        message: 'Berhasil menghapus member dari project',
        status: 'SUCCESS',
        title: 'Member dihapus',
      });
    },
    onError() {
      Notifications({
        message: 'Gagal menghapus member dari project',
        status: 'FAILED',
        title: 'Member gagal dihapus',
      });
    },
  });

  const handleDeleteMemberProject = () => {
    console.log('member id : ', memberId);

    removeMember({ memberId, projectId: query.id as string });
  };

  useEffect(() => {
    setMemberId(id);
  }, [id]);

  return (
    <>
      <ModalAction
        headerText="Hapus Member dari project?"
        message="Data yang telah dihapus tidak dapat dikembalikan"
        type="delete"
        opened={openedDeleteConfirmation}
        close={closeModalDelete}
      >
        <Group mt={20}>
          <Button
            variant=""
            onClick={handleDeleteMemberProject}
            w={'48%'}
            loading={isPending}
            radius={'md'}
            c={'white'}
            bg={COLORS.DANGER}
          >
            Hapus
          </Button>
          <Button
            onClick={closeModalDelete}
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

      <Card
        radius={'lg'}
        withBorder
        shadow="xs"
        className="h-fit py-10 px-10 flex flex-col gap-7"
      >
        <Card.Section className="flex flex-col gap-5">
          <div className="flex items-center justify-center">
            <Avatar
              src={profilePicture}
              size={60}
              radius={'100%'}
              className="border  border-solid border-gray-300  "
            />
          </div>

          <Stack spacing={5} align="center">
            <Text className="font-medium">{name}</Text>
            <Text className="text-gray-400">{position}</Text>
          </Stack>
        </Card.Section>
        <Card.Section>
          <Button
            className="h-[36px] border border-red-400 text-red-400 hover:bg-red-50 hover:text-red-300"
            variant="outline"
            onClick={openModalDelete}
            fullWidth
          >
            Remove Member
          </Button>
        </Card.Section>
      </Card>
    </>
  );
};

export default CrewCard;
