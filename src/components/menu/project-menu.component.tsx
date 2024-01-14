import { COLORS } from '@/src/constant/colors.constant';
import { Menu } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface IProjectMenuProps {
  buttonMenu?: ReactNode;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
}
const ProjectMenu = ({
  buttonMenu,
  opened,
  setOpened,
  children,
}: IProjectMenuProps) => {
  return (
    <Menu position="top" opened={opened} onChange={setOpened}>
      <Menu.Target>
        <IconDots className="text-gray-400 hover:text-blue-400" size={27} />
      </Menu.Target>

      <Menu.Dropdown>{children}</Menu.Dropdown>
    </Menu>
  );
};

export default ProjectMenu;
