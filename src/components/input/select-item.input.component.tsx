/* eslint-disable react/display-name */
import { Avatar, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
  name: string;
  position: string;
}

const ItemSelect = forwardRef<HTMLDivElement, ItemProps>(
  (
    { image, name, label, description, position, ...others }: ItemProps,
    ref,
  ) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} radius={'xl'} />

        <div>
          <Text>{label}</Text>
          <Text size="xs" color="dimmed">
            {position}
          </Text>
        </div>
      </Group>
    </div>
  ),
);

export default ItemSelect;
