import { COLORS } from '@/src/constant/colors.constant';
import { Group, Text } from '@mantine/core';
import Link from 'next/link';

interface IHeaderTitle {
  title: string;
  href: string;
}
const HeaderTitle = ({ title, href }: IHeaderTitle) => {
  return (
    <Group position="apart" w={'100%'}>
      <Text fw={700}>{title}</Text>
      <Link
        href={href}
        style={{
          color: COLORS.PRIMARY,
          fontSize: '0.875rem',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        Lihat Semua {'>'}
      </Link>
    </Group>
  );
};

export default HeaderTitle;
