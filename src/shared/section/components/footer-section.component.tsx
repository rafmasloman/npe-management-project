import {
  Divider,
  SimpleGrid,
  Text,
  Stack,
  Container,
  Group,
  Flex,
  Image,
} from '@mantine/core';
import { IconMap } from '@tabler/icons-react';
import Link from 'next/link';
import FooterHeader from '../../header/components/footer-header.component';
import FooterList from '../../list/components/footer-list.component';
import { footerData } from '../utils/footer.utils';
import { COLORS } from '@/src/constant/colors.constant';
import ICWhatsapp from '@/src/assets/icons/Whatsapp.icon';
import ICInstagram from '@/src/assets/icons/Instagram.icon';
import ICLinkedin from '@/src/assets/icons/Linkedin.icon';
import NPELogo from '@/src/assets/images/logonpe_light.png';

const FooterSection = () => {
  return (
    <Container size={'xl'} py={30}>
      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 1 },
          { minWidth: 'lg', cols: 2 },
        ]}
        spacing={100}
      >
        <Text className="text-gray-300 text-lg font-medium lg:text-xl w-full ">
          Perusahaan software house yang membantu anda membuat website, aplikasi
          dan kebutuhan lainnya secara digital dengan tim profesional yang
          berpengalaman.
        </Text>

        <Stack>
          <Text className="text-white">HQ - Makassar, Sulawesi Selatan</Text>
          <Flex align={'center'} justify={'space-between'} gap={20}>
            <IconMap color="white" />
            <Text className="text-white font-light w-fit">
              BTP Blok E No.159, Tamalanrea, Kec. Tamalanrea, Kota Makassar,
              Sulawesi Selatan 90245
            </Text>
          </Flex>
        </Stack>
      </SimpleGrid>

      <Divider my={40} color={COLORS.GRAY} />

      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 2 },
          { minWidth: 'lg', cols: 3 },
        ]}
        spacing={'xl'}
      >
        {footerData.map((data: any) => {
          return (
            <div key={data.title}>
              <FooterHeader text={data.title} />
              <Stack mt={20} spacing={30}>
                {data.textList.map((listData: any) => {
                  return (
                    <FooterList
                      text={listData.name}
                      href={listData.href}
                      key={listData.name}
                    />
                  );
                })}
              </Stack>
            </div>
          );
        })}
      </SimpleGrid>

      <Divider my={40} color={COLORS.GRAY} />

      <Group position="apart">
        <Group spacing={'xl'}>
          <Link href={''}>
            <ICWhatsapp color="white" />
          </Link>
          <Link href={''}>
            <ICInstagram color="white" />
          </Link>
          <Link href={''}>
            <ICLinkedin />
          </Link>
        </Group>

        <Image
          src={NPELogo.src}
          alt="NPE Logo"
          className="w-[32px] h-fit"
          width={30}
          height={'fit-content'}
        />
      </Group>
    </Container>
  );
};

export default FooterSection;
