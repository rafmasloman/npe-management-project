import { Avatar, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

interface IItemSelectProps {
  label: string;
  icon?: string;
}
const SelectItem = forwardRef<HTMLDivElement, IItemSelectProps>(
  ({ icon, label, ...others }: IItemSelectProps, ref) => (
    <div ref={ref} {...others}>
      <Group>
        <Avatar
          size={'xs'}
          className="w-1 h-fit"
          src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${icon}`}
        />
        <div>
          <Text className="text-black">{label}</Text>
        </div>
      </Group>
    </div>
  ),
);

SelectItem.displayName = 'SelectItem';

export default SelectItem;
