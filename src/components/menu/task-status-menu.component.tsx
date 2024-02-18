import { COLORS } from '@/src/constant/colors.constant';
import { usePutStatusTask } from '@/src/hooks/task/usePutStatusTaskMutation';
import { TODO_UTILS } from '@/src/utils/todo.util';
import { Group, Menu } from '@mantine/core';
import { IconCircleFilled } from '@tabler/icons-react';
import React, { useState } from 'react';

type Props = {};

interface ITaskStatusMenuPropsTypes {
  id: number;
}
const TaskStatusMenu = ({ id }: ITaskStatusMenuPropsTypes) => {
  const { mutate: updateTaskStatus } = usePutStatusTask();

  const handleUpdateStatus = (status: string) => {
    console.log('id : ', id);

    console.log('handle status : ', status);

    updateTaskStatus({ id, status });
  };

  return (
    <Menu position="right">
      <Menu.Target>
        <div>
          <p className="text-xs">Status</p>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label className="py-1.5">Ubah Status</Menu.Label>

        <Menu.Item className="py-0">
          <Group onClick={() => handleUpdateStatus('TODO')}>
            <IconCircleFilled
              color={'yellow'}
              className={`text-[${TODO_UTILS.STATUS_COLOR('ToDo')}]`}
              width={10}
              height={10}
            />

            <p className="text-xs">To Do</p>
          </Group>
        </Menu.Item>

        <Menu.Item className="py-0">
          <Group onClick={() => handleUpdateStatus('ON_PROGRESS')}>
            <IconCircleFilled
              className={`text-[${TODO_UTILS.STATUS_COLOR('On_Progress')}]`}
              width={10}
              height={10}
            />

            <p className="text-xs">On Progress</p>
          </Group>
        </Menu.Item>

        <Menu.Item className="py-0">
          <Group onClick={() => handleUpdateStatus('COMPLETED')}>
            <IconCircleFilled
              className={`text-[${TODO_UTILS.STATUS_COLOR('Completed')}]`}
              width={10}
              height={10}
            />

            <p className="text-xs">Completed</p>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TaskStatusMenu;
