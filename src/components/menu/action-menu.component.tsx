import { COLORS } from '@/src/constant/colors.constant';
import { Menu } from '@mantine/core';
import { FloatingPosition } from '@mantine/core/lib/Floating';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface IActionMenuProps {
  buttonMenu?: ReactNode;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  position: FloatingPosition;
}
const ActionMenu = ({
  buttonMenu,
  opened,
  setOpened,
  children,
  position,
}: IActionMenuProps) => {
  return (
    <Menu
      position={position}
      opened={opened}
      onChange={setOpened}
      styles={{
        item: {
          padding: 5,
        },
      }}
    >
      <Menu.Target>
        <IconDots className="text-gray-400 hover:text-blue-400" size={27} />
      </Menu.Target>

      <Menu.Dropdown>{children}</Menu.Dropdown>
    </Menu>
  );
};

export default ActionMenu;
