import { useDrop } from 'react-dnd';

interface TaskDropOptions {
  acceptType: string;
  dropType: string;
}

export const useDropItem = (
  options: TaskDropOptions,
  onDrop: (text: string, id: number, status: string) => void,
) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: options.acceptType,
    // item: { text },
    drop: (item: any) => onDrop(item.text, item.id, options.dropType),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return { isOver, dropRef };
};
