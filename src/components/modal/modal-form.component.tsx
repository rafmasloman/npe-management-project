import { COLORS } from '@/src/constant/colors.constant';
import { Box, Button, Group, Modal, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

interface IModalFormProps {
  title: string;
  btnText: string;
  children: React.ReactNode;
}

const ModalForm = ({ title, children, btnText }: IModalFormProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        radius={'lg'}
        padding={25}
        size={'md'}
        // overlayProps={{
        //   color:
        //     theme.colorScheme === 'dark'
        //       ? theme.colors.dark[9]
        //       : theme.colors.gray[2],
        //   opacity: 0.55,
        //   blur: 3,
        // }}
        styles={{
          title: {
            width: '100%',
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: 600,
          },
        }}
      >
        {children}
      </Modal>

      <Group>
        <Button onClick={open} leftIcon={<IconPlus />} bg={COLORS.PRIMARY}>
          {btnText}
        </Button>
      </Group>
    </>
  );
};

export default ModalForm;
