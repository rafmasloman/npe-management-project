import { Box, Space, SimpleGrid, rem, Stack, Menu, Group } from '@mantine/core';
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
import { usePutStatusTask } from '../hooks/task/usePutStatusTaskMutation';
import { useState } from 'react';

const TaskWorkSpace = ({ todos }: any) => {
  const { mutate: updateStatus } = usePutStatusTask();

  const handleOnDrop = (taskName: string, taskId: number, status: string) => {
    console.log('handle drop : ', taskName);

    updateStatus({ taskId, status });
  };

  const [{ isOver }, dropTodo] = useDrop(() => ({
    accept: 'task',
    // item: { text },
    drop: (item: any) => handleOnDrop(item.text, item.id, 'TODO'),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isOverProgress }, dropOnProgress] = useDrop(() => ({
    accept: 'task',
    // item: { text },
    drop: (item: any) => handleOnDrop(item.text, item.id, 'ON_PROGRESS'),
    collect: (monitor) => ({
      isOverProgress: !!monitor.isOver(),
    }),
  }));

  const [{ isOverCompleted }, dropOnCompleted] = useDrop(() => ({
    accept: 'task',
    // item: { text },
    drop: (item: any) => handleOnDrop(item.text, item.id, 'COMPLETED'),
    collect: (monitor) => ({
      isOverCompleted: !!monitor.isOver(),
    }),
  }));

  const todo = todos?.todo?.filter((t: any) =>
    t.status.toLowerCase().includes('todo'),
  );

  const on_progress = todos?.onprogress?.filter((t: any) =>
    t.status.toLowerCase().includes('on_progress'),
  );

  const completed = todos?.completed?.filter((t: any) =>
    t.status.toLowerCase().includes('completed'),
  );

  return (
    <Box>
      <ModalForm btnText="Tambah Task" title="Create Task">
        <TaskForm />
      </ModalForm>

      <Space h={50} />

      <SimpleGrid cols={3} spacing={rem(50)}>
        <Stack ref={dropTodo} className={`relative `} spacing={20}>
          <div className="">
            <HeaderStatus
              headerColor={COLORS.THIRD}
              text="To Do"
              totalTask={todo?.length}
            />
          </div>

          <div
            className={`w-full p-1.5 h-screen space-y-[30px] ${
              isOver
                ? 'border-2 border-dashed border-opacity-40  border-amber-500 rounded-lg'
                : 'border-2 border-solid border-transparent'
            }`}
          >
            {todo?.map((t: any) => {
              return (
                <TaskCard
                  key={t.id}
                  id={t.id}
                  deadline={t.endDate!}
                  member={t.member}
                  text={t.name}
                  comment={t.comment}
                  status={t.status}
                />
              );
            })}
          </div>
        </Stack>

        <Stack ref={dropOnProgress} spacing={20}>
          <HeaderStatus
            text="On Progress"
            headerColor={COLORS.DEEPBLUE}
            totalTask={on_progress?.length}
          />

          <div
            className={`w-full p-1.5 h-screen space-y-[30px] ${
              isOverProgress
                ? 'border-2 border-dashed border-opacity-40  border-cyan-600 rounded-lg'
                : 'border-2 border-solid border-transparent'
            }`}
          >
            {on_progress?.map((t: any) => {
              return (
                <TaskCard
                  key={t.id}
                  id={t.id}
                  deadline={t.endDate!}
                  member={t.member}
                  text={t.name}
                  comment={t.comment}
                  status={t.status}
                />
              );
            })}
          </div>
        </Stack>

        <Stack ref={dropOnCompleted} spacing={20}>
          <HeaderStatus
            text="Completed"
            headerColor={COLORS.SUCCESS}
            totalTask={completed?.length}
          />

          <div
            className={`w-full p-1.5 h-screen space-y-[30px] ${
              isOverCompleted
                ? 'border-2 border-dashed border-opacity-40  border-green-600  rounded-lg'
                : 'border-2 border-solid border-transparent'
            }`}
          >
            {completed?.map((t: any) => {
              return (
                <TaskCard
                  key={t.id}
                  id={t.id}
                  deadline={t.endDate!}
                  member={t.member}
                  text={t.name}
                  comment={t.comment}
                  status={t.status}
                />
              );
            })}
          </div>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default TaskWorkSpace;
