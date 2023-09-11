import { Group, Text } from '@mantine/core';
import MenuComp from '../menu/menu.component';
import UserProfile from '../profile/user-profile.component';

interface IHeaderPageProps {
  pageTitle: string;
  role: string;
}

const HeaderPage = ({ pageTitle, role }: IHeaderPageProps) => {
  const firstLetterToUpperCase = (text: string) => {
    const newText =
      text.split('')[0].toUpperCase() + pageTitle.slice(1, pageTitle.length);
    return newText;
  };

  return (
    <Group position="apart" px={50} mt={25}>
      <Text fw={600} fz={'1.25rem'}>
        {firstLetterToUpperCase(pageTitle)}
      </Text>
      <MenuComp button={<UserProfile name="Rafly Masloman" role={role} />} />
    </Group>
  );
};

export default HeaderPage;
