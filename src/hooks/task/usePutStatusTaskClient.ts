import { useState } from 'react';

export const usePutStatusTaskClient = (status: string, id: number) => {
  const [statusTask, setStatusTask] = useState('');
  const [taskId, setTaskId] = useState<number | null>(null);

  const handleSetStatus = () => {
    setStatusTask(status);
  };

  const handleSetId = () => {
    setTaskId(id);
  };

  return { statusTask, taskId, handleSetStatus, handleSetId };
};
