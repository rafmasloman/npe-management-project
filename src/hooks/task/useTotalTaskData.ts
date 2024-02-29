import { useEffect, useState } from 'react';

export const useCountStatusTaskData = (tasks: any) => {
  const [totalTodo, setTotalTodo] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalTaskCompletedPercent, setTotalTaskCompletedPercent] = useState(0);

  useEffect(() => {
    const getTotalTodo = () => {
      const totalTodoState = tasks?.filter((task: any) => {
        return task.status === 'TODO';
      }).length;

      setTotalTodo(totalTodoState);
    };

    const getTotalProgress = () => {
      const totalProgressState = tasks?.filter((task: any) => {
        return task.status === 'ON_PROGRESS';
      }).length;

      setTotalProgress(totalProgressState);
    };

    const getTotalCompleted = () => {
      const totalCompletedState = tasks?.filter((task: any) => {
        return task.status === 'COMPLETED';
      }).length;

      setTotalCompleted(totalCompletedState);
    };

    getTotalTodo();
    getTotalProgress();
    getTotalCompleted();
  }, [tasks]);

  useEffect(() => {
    const totalTaskPercent = () => {
      tasks?.length <= 0
        ? setTotalTaskCompletedPercent(0)
        : setTotalTaskCompletedPercent(
            Math.trunc((totalCompleted / tasks?.length) * 100),
          );
    };

    totalTaskPercent();
  }, [tasks, totalCompleted]);

  return {
    totalTodo,
    totalProgress,
    totalCompleted,
    totalTaskCompletedPercent,
  };
};
