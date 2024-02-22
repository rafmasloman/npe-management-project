import { COLORS } from '@/src/constant/colors.constant';
import { Avatar, Card, Flex, Group, Stack, Text } from '@mantine/core';

interface ITeamCardProps {
  name: string;
  position: string;
}

const TeamCard = ({ name, position }: ITeamCardProps) => {
  return (
    <Card radius={'lg'} className="w-full md:w-[370px]">
      <Flex direction={'row'} align={'center'} gap={10}>
        <Avatar size={45} radius={'xl'} />
        <Stack spacing={0}>
          <Text fw={500} className="">
            {name}
          </Text>
          <Text fw={500} color={COLORS.GRAY} fz={'0.875rem'}>
            {position}
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
};

export default TeamCard;
