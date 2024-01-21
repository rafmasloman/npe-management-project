import { Text } from '@mantine/core';

interface IFooterHeader {
  text: string;
}

const FooterHeader = ({ text }: IFooterHeader) => {
  return <Text className="text-white font-medium text-lg">{text}</Text>;
};

export default FooterHeader;
