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

interface IModalUploadProps {
  headerText: string;
  message: string;
  children: ReactNode;
  type: string;
  opened: boolean;
  close: () => void;
}

const ModalUpload = ({
  headerText,
  message,
  children,
  opened,
  close,
  type,
}: IModalUploadProps) => {
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
        <div className="flex justify-between">
          <Text className="text-xl font-semibold">{headerText}</Text>

          <IconX className="text-gray-400 hover:text-black" onClick={close} />
        </div>

        {children}
      </Modal>
    </>
  );
};

export default ModalUpload;
