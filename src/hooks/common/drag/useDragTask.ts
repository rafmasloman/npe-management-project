import { useDrag } from 'react-dnd';

export const useDragItem = (type: string, { id, text, status }: any) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type,
    item: { id, text, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return { isDragging, dragRef };
};
