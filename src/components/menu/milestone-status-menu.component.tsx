import { COLORS } from '@/src/constant/colors.constant';
import { usePutMilestoneStatus } from '@/src/hooks/milestone/usePutMilestoneStatus';
import { Group, Menu, Text } from '@mantine/core';
import { IconCircleFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface IMilestoneStatusMenu {
  id: string;
  text: string;
  progress?: number;
}

const MilestoneStatusMenu = ({ id, text, progress }: IMilestoneStatusMenu) => {
  const { mutate: updateMilestoneStatus } = usePutMilestoneStatus();
  const [milestoneId, setmilestoneId] = useState('');

  console.log('progress status : ', progress);

  const handleSubmitChangeStatus = (status: string) => {
    setmilestoneId(id);

    console.log('id : ', milestoneId);
    console.log('status : ', status);

    if (!!milestoneId) {
      updateMilestoneStatus({ id: milestoneId, status });
    }
  };

  if (!!progress && progress >= 100) {
    updateMilestoneStatus({ id: milestoneId, status: 'COMPLETED' });
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Group
          className="border border-solid border-gray-300  w-fit h-fit px-2.5 py-1 rounded-lg"
          spacing={10}
        >
          <IconCircleFilled
            style={{
              color:
                text === 'TODO'
                  ? COLORS.TODO
                  : text === 'ON_PROGRESS'
                  ? COLORS.ON_PROGRESS
                  : COLORS.COMPLETED,
            }}
            size={12}
          />
          <Text>
            {text.slice(0, 1)}
            {text.slice(1, text.length).toLowerCase()}
          </Text>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Milestone Status</Menu.Label>

        <Menu.Item
          onClick={() => handleSubmitChangeStatus('TODO')}
          icon={<IconCircleFilled style={{ color: COLORS.TODO }} size={12} />}
        >
          TODO
        </Menu.Item>
        <Menu.Item
          onClick={() => handleSubmitChangeStatus('ON_PROGRESS')}
          icon={
            <IconCircleFilled style={{ color: COLORS.ON_PROGRESS }} size={12} />
          }
        >
          ON_PROGRESS
        </Menu.Item>
        <Menu.Item
          disabled
          icon={
            <IconCircleFilled style={{ color: COLORS.COMPLETED }} size={12} />
          }
        >
          COMPLETED
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MilestoneStatusMenu;
