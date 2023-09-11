import { COLORS } from '@/src/constant/colors.constant';
import { Avatar, Card, Group, Stack, Text } from '@mantine/core';

interface ITeamCardProps {
  name: string;
  position: string;
}

const TeamCard = ({ name, position }: ITeamCardProps) => {
  return (
    <Card radius={'lg'}>
      <Group>
        <Avatar size={45} radius={'xl'} />
        <Stack spacing={0}>
          <Text fw={600}>{name}</Text>
          <Text fw={500} color={COLORS.GRAY} fz={'0.875rem'}>
            {position}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default TeamCard;
