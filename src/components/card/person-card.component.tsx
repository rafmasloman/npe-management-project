import { COLORS } from '@/src/constant/colors.constant';
import { Avatar, Group, Text, rem } from '@mantine/core';

interface IPersonCardProps {
  image?: string;
  name: string;
}

const PersonCard = ({ name }: IPersonCardProps) => {
  return (
    <Group
      px={'1rem'}
      py={rem(7)}
      align="center"
      bg={'white'}
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: COLORS.GRAY,
        borderRadius: '30px',
      }}
      spacing={'xs'}
    >
      <Avatar radius={'lg'} size={'md'} />
      <Text fz={'0.825rem'}>{name}</Text>
    </Group>
  );
};

export default PersonCard;
