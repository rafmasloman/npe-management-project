import { Box, Space, SimpleGrid, rem, Stack, Alert } from '@mantine/core';
import TaskForm from '../components/form/task/task.form.component';
import HeaderStatus from '../components/header/header-task-status.component';
import ModalForm from '../components/modal/modal-form.component';
import { COLORS } from '../constant/colors.constant';
import TaskCard from '../components/card/task-card.component';
import { usePutStatusTask } from '../hooks/task/usePutStatusTaskMutation';
import { useDropItem } from '../hooks/common/drop/useDropItem';
import { IconAlertHexagon } from '@tabler/icons-react';

const TaskWorkSpace = ({ todos, isHaveTeamMembers }: any) => {
  const { mutate: updateStatus } = usePutStatusTask();

  const handleOnDrop = (text: string, id: number, status: string) => {
    updateStatus({ id, status });
  };

  const { isOver, dropRef: dropTodo } = useDropItem(
    { acceptType: 'task', dropType: 'TODO' },
    handleOnDrop,
  );

  const { isOver: isOverProgress, dropRef: dropOnProgress } = useDropItem(
    { acceptType: 'task', dropType: 'ON_PROGRESS' },
    handleOnDrop,
  );

  const { isOver: isOverCompleted, dropRef: dropOnCompleted } = useDropItem(
    { acceptType: 'task', dropType: 'COMPLETED' },
    handleOnDrop,
  );

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
    <Box className="">
      <ModalForm
        btnText="Tambah Task"
        title="Create Task"
        disable={!isHaveTeamMembers}
      >
        <TaskForm />
      </ModalForm>

      <Alert
        icon={<IconAlertHexagon />}
        title="Oops Kamu belum mempunyai crew!"
        color="orange"
        radius={'md'}
        styles={{
          title: {
            fontSize: rem(16),
          },
          root: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: COLORS.DEEPGRAY,
            display: isHaveTeamMembers ? 'none' : 'block',
            marginTop: 20,
          },
        }}
      >
        Saat ini belum ada member pada project ini mohon undang member ke
        project terlebih dahulu sebelum memberikan task
      </Alert>

      <Space h={50} />

      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 1, spacing: rem(10) },
          { minWidth: 'md', cols: 3, spacing: rem(50) },
        ]}
      >
        <Stack ref={dropTodo} className={` w-full`} spacing={20}>
          <div className="">
            <HeaderStatus
              headerColor={COLORS.THIRD}
              text="To Do"
              totalTask={todo?.length}
            />
          </div>

          <div
            className={`w-full p-1.5 h-fit lg:h-screen space-y-[30px]  ${
              isOver
                ? 'border-2 border-dashed border-opacity-75  border-amber-500 rounded-lg transition duration-700'
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
                  priority={t.priority}
                  milestone={t.milestone}
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
            className={`w-full p-1.5 h-fit lg:h-screen space-y-[30px] ${
              isOverProgress
                ? 'border-2 border-dashed border-opacity-75  border-cyan-600 rounded-lg transition duration-700'
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
                  priority={t.priority}
                  milestone={t.milestone}
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
            className={`w-full p-1.5 h-fit lg:h-screen space-y-[30px] ${
              isOverCompleted
                ? 'border-2 border-dashed border-opacity-75  border-green-600  rounded-lg transition duration-700'
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
                  priority={t.priority}
                  milestone={t.milestone}
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
