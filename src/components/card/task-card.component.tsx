import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Menu,
  Space,
  Text,
  Tooltip,
  rem,
} from '@mantine/core';
import { IconClockCheck, IconDots } from '@tabler/icons-react';
import MenuComp from '../menu/menu.component';
import { COLORS } from '@/src/constant/colors.constant';
import { useState } from 'react';
import { useDrag } from 'react-dnd';

interface ITaskCardProps {
  badge: string;
  member: IMemberTaskCardProps;
  text: string;
  deadline: string;
  badgeStyles?: {
    color: string;
    backgroundColor: string;
  };
}

interface IMemberTaskCardProps {
  id: number;
  name: string;
  image: string;
}

const TaskCard = ({
  badge,
  member,
  text,
  deadline,
  badgeStyles,
}: ITaskCardProps) => {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: 'task',
    // item: { text },
    collect: (monitor) => ({
      opacity: !!monitor.isDragging(),
    }),
  }));

  console.log('dnd ', opacity);
  return (
    <Card radius={'md'} shadow="md" ref={dragRef}>
      <Group position="apart">
        <Badge style={badgeStyles}>{badge}</Badge>

        <ActionIcon color={COLORS.GRAY}>
          <IconDots color={COLORS.GRAY} />
        </ActionIcon>
      </Group>

      <Space h={rem(16)} />

      <Group>
        <Text fw={500}>{text}</Text>
      </Group>

      <Space h={rem(10)} />

      <Group position="apart">
        <Group spacing={'xs'}>
          <IconClockCheck size={rem(14)} color={COLORS.DANGER} />
          <Text fz={rem(12)}>{deadline}</Text>
        </Group>
        <Avatar.Group>
          <Tooltip
            label={member.name}
            withArrow
            color={COLORS.LIGHTBLUE}
            styles={{
              tooltip: {
                color: COLORS.DEEPBLUE,
                fontWeight: 600,
              },
            }}
          >
            <Avatar radius={'xl'} />
          </Tooltip>
        </Avatar.Group>
      </Group>
    </Card>
  );
};

export default TaskCard;
