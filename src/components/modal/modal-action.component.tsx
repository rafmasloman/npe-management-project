import { ICAlert } from '@/src/assets/icons/alert_delete.icon';
import { ICQuestion } from '@/src/assets/icons/alert_question.icon';
import { COLORS } from '@/src/constant/colors.constant';
import {
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconX } from '@tabler/icons-react';
import React, { ReactNode } from 'react';

interface IModalActionProps {
  headerText: string;
  message: string;
  children: ReactNode;
  type: string;
  opened: boolean;
  close: () => void;
}

const ModalAction = ({
  headerText,
  message,
  children,
  opened,
  close,
  type,
}: IModalActionProps) => {
  const chooseIconAlert = () => {
    switch (type) {
      case 'delete':
        return <ICAlert width={30} height={30} />;

      case 'updated':
        return <ICQuestion width={30} height={30} />;

      default:
        break;
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        radius={'lg'}
        padding={25}
        size={'md'}
        styles={{
          body: {
            padding: 20,
          },
        }}
      >
        <div className="flex  justify-between ">
          <Stack spacing={0}>
            <Group>
              {chooseIconAlert()}
              <Text className="text-xl font-semibold">{headerText}</Text>
            </Group>
            <Text className="text-sm text-gray-400 mt-2.5">{message}</Text>
          </Stack>

          <IconX className="text-gray-400 hover:text-black" onClick={close} />
        </div>

        {children}
      </Modal>
    </>
  );
};

export default ModalAction;
