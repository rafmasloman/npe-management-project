import { COLORS } from '@/src/constant/colors.constant';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';

interface IButtonNavigate {
  children: React.ReactNode;
  url: string;
  icon: JSX.Element;
}
const ButtonNavigate = ({ children, url, icon }: IButtonNavigate) => {
  const largeScreen = useMediaQuery('(min-width: 60em)');

  return (
    <Link href={url}>
      <Button
        rel="noopener noreferrer"
        leftIcon={icon}
        bg={COLORS.PRIMARY}
        radius={'md'}
        // mx={largeScreen ? 50 : '1.25rem'}
        // w={'100%'}
      >
        {children}
      </Button>
    </Link>
  );
};

export default ButtonNavigate;
