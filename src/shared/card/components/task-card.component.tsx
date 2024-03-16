import { Avatar, Badge, Card, Group, Stack, Text } from '@mantine/core';
import { ITaskCardDataProps } from '../interfaces/task-card.interfaces';
import { COLORS } from '@/src/constant/colors.constant';

const TaskCardDashboard = ({
  title,
  priority,
  projectIcon,
  projectName,
  status,
}: ITaskCardDataProps) => {
  const generateStatus = status.toLowerCase().includes('ToDo'.toLowerCase())
    ? 'yellow'
    : status.toLowerCase().includes('On_Progress'.toLowerCase())
    ? 'indigo'
    : 'green';

  const generatePriority = priority.toLowerCase().includes('low'.toLowerCase())
    ? 'indigo'
    : priority.toLowerCase().includes('medium')
    ? 'yellow'
    : 'red';

  return (
    <Card
      withBorder
      radius={'sm'}
      shadow="xs"
      className=" border-neutral-100 hover:border hover:border-solid hover:border-secondary"
      style={{
        borderStyle: 'solid',
        borderWidth: '0 0 0 12px',
        borderColor: COLORS.SECONDARY,
      }}
    >
      <Group position="apart">
        <Stack>
          <Text>{title}</Text>

          <Group spacing={10}>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${projectIcon}`}
              size={16}
              className="h-fit"
            />
            <Text>{projectName}</Text>
          </Group>
        </Stack>

        <Stack>
          <Group>
            <Text className="text-xs">Priority : </Text>
            <Badge size="sm" color={generatePriority}>
              {priority}
            </Badge>
          </Group>

          <Group>
            <Text className="text-xs">Status : </Text>
            <Badge size="sm" color={generateStatus}>
              {status}
            </Badge>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};

export default TaskCardDashboard;
