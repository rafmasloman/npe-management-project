import { COLORS } from '@/src/constant/colors.constant';
import { Box, Button, SimpleGrid, Stack, Text, Image } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import AppDefault01 from '@/src/assets/images/default-project.png';
import AppDefault02 from '@/src/assets/images/default-project-detail.png';
import { ICLaunch } from '@/src/assets/icons/launch.icon';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { ROUTES } from '@/src/constant/routes.constant';

const ContactUsSection = () => {
  const token = __getBrowserAuthCookie(TOKEN_NAME);
  return (
    <Box bg={'#14263F'} className="relative overflow-hidden rounded-3xl">
      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 1 },
          { minWidth: 'md', cols: 2 },
        ]}
      >
        <Stack className="p-10 lg:px-0 lg:py-14 lg:pl-16 ">
          <Stack spacing={30} className="">
            <Text className="text-xl lg:text-5xl text-white font-medium">
              Mulai Project anda!
            </Text>
            <Text className="text-gray-400 text-sm lg:text-lg font-normal lg:font-medium">
              Banyak keutungan yang didapat dengan meningkatkan struktur dan
              memudahkan anda dalam mengelola project dari client
            </Text>
          </Stack>

          <Button
            rightIcon={<ICLaunch width={25} height={25} />}
            variant="outline"
            className="bg-white  text-blue-950  rounded-lg  font-medium w-fit h-[40px] lg:text-lg lg:h-[60px]"
            // component="a"
            // href={!token ? ROUTES.LOGIN : ROUTES.DASHBOARD}
          >
            Launch Project
          </Button>
        </Stack>

        <div className="flex">
          <Image
            src={AppDefault01.src}
            alt="Image"
            className="hidden lg:block absolute right-[300px] z-10 -bottom-48"
            height={500}
            width={250}
          />

          <Image
            src={AppDefault02.src}
            alt="Image"
            className="hidden lg:block absolute right-36 -top-48 "
            height={500}
            width={250}
          />
        </div>
      </SimpleGrid>
    </Box>
  );
};

export default ContactUsSection;
