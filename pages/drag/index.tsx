import { Card, Image, Stack } from '@mantine/core';
import { useDrag, useDrop } from 'react-dnd';

const DragCard = ({ name }: any) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'profile',

    item: { name },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      radius={'md'}
      ref={dragRef}
      style={{
        width: 200,
        height: 400,
      }}
    >
      <div>
        <Image
          src={
            'https://source.unsplash.com/man-in-black-jacket-and-brown-cap-YUu9UAcOKZ4'
          }
          width={50}
          height={50}
          alt="Images"
        />
      </div>
      <p>{name}</p>
    </Card>
  );
};

const DraggablePages = () => {
  const [{ isOver }, dropTodo] = useDrop(() => ({
    accept: 'profile',
    // item: { text },
    drop: () => {},
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Stack>
      <div>draggable</div>

      <DragCard name="Rafly" />
    </Stack>
  );
};

export default DraggablePages;
