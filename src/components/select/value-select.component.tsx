import {
  Avatar,
  Box,
  CloseButton,
  Group,
  MultiSelectValueProps,
  Space,
  Text,
  rem,
} from '@mantine/core';

const ItemValue = ({
  value,
  label,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & { value: string }) => {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,

          border: `${rem(1)} solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          padding: '0.325rem 0.75rem 0.325rem 0.75rem',
          borderRadius: theme.radius.md,
        })}
      >
        <Group spacing={'xs'} align="center">
          <Avatar radius={'xl'} size={'sm'} />
          <Text fz={'0.75rem'}>{label}</Text>
        </Group>

        <Space w={12} />
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={16}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
};

export default ItemValue;
