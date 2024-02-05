import { COLORS } from '@/src/constant/colors.constant';
import { Avatar, Group, Text, rem } from '@mantine/core';

interface IPersonCardProps {
  image?: string;
  name: string;
}

const PersonCard = ({ name, image }: IPersonCardProps) => {

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
      <Avatar radius={'xl'} size={30} src={image} />
      <Text className="text-xs">{name}</Text>
    </Group>
  );
};

export default PersonCard;
