import IL_404 from '@/src/assets/illustration/404 Error-rafiki.png';
import { COLORS } from '@/src/constant/colors.constant';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';

function Error(statusCode: { statusCode: number }) {
  // console.log(statusCode.statusCode);

  return (
    <>
      <Head>
        <title>{statusCode.statusCode} Error Page not found </title>
        <link rel="icon" href="/npe_logo.svg" />
      </Head>
      <Group align="center" h={'100vh'} position="center">
        <Stack>
          <Title fz={'6rem'}>Oops!</Title>
          <Text color={COLORS.GRAY} fw={500}>
            Halaman yang anda cari tidak ditemukan, silahkan kembali <br /> ke
            halaman sebelumnya ato jelajahi halaman lain
          </Text>
          {/* <div>
          <Button>Back to Home</Button>
        </div> */}
        </Stack>

        <Image
          src={IL_404.src}
          alt="Not Found Illustration"
          width={600}
          height={600}
        />
      </Group>
    </>
  );
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
