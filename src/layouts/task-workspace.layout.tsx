import { Box, Space, SimpleGrid, rem, Stack, Menu } from '@mantine/core';
import {
  IconCircle,
  IconCircle0Filled,
  IconCircleFilled,
  IconTrash,
} from '@tabler/icons-react';
import TaskForm from '../components/form/task.form.component';
import HeaderStatus from '../components/header/header-task-status.component';
import ModalForm from '../components/modal/modal-form.component';
import { COLORS } from '../constant/colors.constant';
import TaskCard from '../components/card/task-card.component';
import { useDrop } from 'react-dnd';

const TaskWorkSpace = ({ todos }: any) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    // item: { text },
    drop: () => console.log('drop '),
    collect: (monitor) => (
      console.log(monitor),
      {
        isOver: !!monitor.isOver(),
      }
    ),
  }));

  

  const todo = todos?.todo?.filter((t: any) => t.status.includes('To Do'));

  return (
    <Box>
      <ModalForm btnText="Tambah Task" title="Create Task">
        <TaskForm />
      </ModalForm>

      <Space h={30} />

      <SimpleGrid cols={3} spacing={rem(50)}>
        <Stack>
          <HeaderStatus
            icon={
              <IconCircleFilled
                size={rem(16)}
                style={{ color: COLORS.THIRD }}
              />
            }
            text="To Do"
          />

          {todo.map((t: any) => {
            return (
              <TaskCard
                key={t.id}
                id={t.id}
                badge="Front End"
                deadline={t.endDate!}
                member={t.member}
                text={t.name}
                comment={t.comment}
              />
            );
          })}

          {/* <TaskCard
            badge="Front End"
            deadline={projectDetail?.endDate!}
            member={{ id: 1, image: '', name: 'Richard Enrico' }}
            text="Slicing Homepage"
          />

          <TaskCard
            badge="UI/UX"
            deadline={projectDetail?.endDate!}
            member={{ id: 1, image: '', name: 'Richard Enrico' }}
            text="Mendesain halaman dashboard dengan fitur progress task dan milestone"
            badgeStyles={{
              color: 'white',
              backgroundColor: COLORS.THIRD,
            }}
          /> */}

          {/* <Menu withArrow zIndex={10} width={'120px'} opened={true}>
            <Menu.Dropdown>
              <Menu.Label>Opsi</Menu.Label>
              <Menu.Item icon={<IconTrash size={rem(14)} />}>Test</Menu.Item>
              <Menu.Item icon={<IconTrash size={rem(14)} />}>Test</Menu.Item>
            </Menu.Dropdown>
          </Menu> */}
        </Stack>

        <Stack ref={drop}>
          <HeaderStatus
            text="On Progress"
            icon={
              <IconCircleFilled
                size={rem(16)}
                style={{ color: COLORS.DEEPBLUE }}
              />
            }
          />

          {/* <TaskCard
            badge="UI/UX"
            deadline={projectDetail?.endDate!}
            member={{ id: 1, image: '', name: 'Richard Enrico' }}
            text="Mendesain halaman dashboard dengan fitur progress task dan milestone"
            badgeStyles={{
              color: 'white',
              backgroundColor: COLORS.THIRD,
            }}
          /> */}

          {/* <Menu withArrow zIndex={10} width={'120px'} opened={true}>
            <Menu.Dropdown>
              <Menu.Label>Opsi</Menu.Label>
              <Menu.Item icon={<IconTrash size={rem(14)} />}>Test</Menu.Item>
              <Menu.Item icon={<IconTrash size={rem(14)} />}>Test</Menu.Item>
            </Menu.Dropdown>
          </Menu> */}
        </Stack>

        <Stack>
          <HeaderStatus
            text="Completed"
            icon={
              <IconCircleFilled
                size={rem(16)}
                style={{ color: COLORS.SUCCESS }}
              />
            }
          />

          {/* <TaskCard
            badge="Front End"
            deadline={projectDetail?.endDate!}
            member={{ id: 1, image: '', name: 'Richard Enrico' }}
            text="Slicing Homepage"
            badgeStyles={{
              color: COLORS.DEEPBLUE,
              backgroundColor: COLORS.LIGHTBLUE,
            }}
          /> */}

          {/* <Menu withArrow zIndex={10} width={'120px'} opened={true}>
            <Menu.Dropdown>
              <Menu.Label>Opsi</Menu.Label>
              <Menu.Item icon={<IconTrash size={rem(14)} />}>Test</Menu.Item>
              <Menu.Item icon={<IconTrash size={rem(14)} />}>Test</Menu.Item>
            </Menu.Dropdown>
          </Menu> */}
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default TaskWorkSpace;
