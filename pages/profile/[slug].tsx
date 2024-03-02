import SEO from '@/src/components/SEO/seo.component';
import ProfileForm from '@/src/components/form/profile/profile-form.component';
import HeaderPage from '@/src/components/header/header-page.component';
import { UserContext } from '@/src/context/user-credential.context';
import { useGetQueryProfile } from '@/src/hooks/profile/useGetQueryProfile';
import { useProfileMember } from '@/src/hooks/profile/useProfileMember';
import { IAuthCredentialResponse } from '@/src/interfaces/auth.interface';
import MainLayout from '@/src/layouts/main.layout';
import { getCurrentPage, getCurrentRole } from '@/src/utils/page.util';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FileButton,
  Grid,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Switch,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconCameraFilled,
  IconPencil,
  IconUserCircle,
} from '@tabler/icons-react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import cookie from 'cookie';
import { __setSSRAuthCookie } from '@/src/utils/cookie.util';
import { GetServerSidePropsContext } from 'next';
import UserQueryApi from '../api/user/user-query';
import MemberQueryAPI from '../api/member/member-query';
import ProfileQueryApi from '../api/profile/profile.query';
import { COLORS } from '@/src/constant/colors.constant';
import { useUpdateProfilePicture } from '@/src/hooks/profile/useUpdateProfilePicture';
import { useGetQueryProfilePicture } from '@/src/hooks/profile/useGetQueryProfilePicture';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { params, req } = ctx;

  const userId = params?.slug;

  const cookieToken = cookie.parse(req.headers.cookie!) as any;

  __setSSRAuthCookie(cookieToken?.token);

  const userProfileData = await ProfileQueryApi.getUserProfile(
    userId as string,
  );

  return { props: { userProfileData: userProfileData.data } };
}

const ProfilePages = ({ userProfileData }: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const { userProfile } = useProfileMember();
  const { data: userMemberProfile } = useGetQueryProfile(userProfile?.id);
  const {
    data: userProfilePicture,
    isLoading: isLoadingPicture,
    isRefetching: isRefetchingPicture,
  } = useGetQueryProfilePicture(userProfileData.user.id);
  const { mutate: updateProfilePicture } = useUpdateProfilePicture();

  const { pathname, query } = useRouter();
  const [checked, setChecked] = useState(false);

  const handleChangeProfilePictureFile = (file: File | null) => {
    setFile(file);
  };

  const handleDeleteProfilePicture = () => {
    console.log('delete');

    setFile(null);
    setProfilePicture('');

    const formData = new FormData();

    formData.set('profilePicture', profilePicture!);

    updateProfilePicture({
      userId: userProfileData.user.id,
      payload: formData,
    });
  };

  useEffect(() => {
    if (!userProfilePicture?.data) {
      setProfilePicture('');
    } else {
      setProfilePicture(userProfilePicture?.data?.profilePicture);
    }
  }, [isLoadingPicture, isRefetchingPicture, userProfilePicture?.data]);

  useEffect(() => {
    if (file !== null) {
      const formData = new FormData();

      formData.set('profilePicture', file);

      updateProfilePicture({
        userId: userProfileData.user.id,
        payload: formData,
      });
    } else {
      setFile(null);
    }
  }, [file]);

  console.log('profile picture : ', profilePicture);

  return (
    <MainLayout>
      <SEO title="Profile" description="Your user Profile Pages" />

      <HeaderPage
        pageTitle={getCurrentPage(pathname)}
        role={getCurrentRole(pathname)}
      />

      <Space h={30} />

      <Container
        size={'xl'}
        className="bg-white border border-solid rounded-xl border-gray-200"
      >
        <Tabs defaultValue={'general'} orientation="vertical">
          <Tabs.List className="gap-7 py-14">
            <Tabs.Tab value="general">
              <Group spacing={10} align="center">
                <IconUserCircle />
                <Text className="text-base">General</Text>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="edit-profile">
              <Group spacing={10} align="center">
                <IconPencil />
                <Text className="text-base">Edit Profile</Text>
              </Group>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="general" className="py-14">
            <div className="pl-10">
              <Box>
                <Title order={3}>My Profile</Title>

                <Space h={30} />

                <Group>
                  <Group>
                    <Avatar
                      size={70}
                      radius={'100%'}
                      src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${profilePicture}`}
                    />
                    <Stack spacing={0}>
                      <Text className="text-lg">{userProfile?.fullname}</Text>
                      <Text className="text-base text-gray-500">
                        {userMemberProfile?.data?.position}
                      </Text>
                    </Stack>
                  </Group>
                </Group>
              </Box>

              <Space h={30} />

              <Box>
                <Title order={4}>Personal Information</Title>

                <Space h={20} />

                <SimpleGrid
                  breakpoints={[
                    { minWidth: 'sm', cols: 1 },
                    { minWidth: 'md', cols: 2, spacing: 10 },
                  ]}
                >
                  <Stack spacing={5} className="mb-5">
                    <Text className="text-neutral-400 font-medium">
                      First Name
                    </Text>
                    <Text>{userProfile?.firstname}</Text>
                  </Stack>

                  <Stack spacing={5} className="mb-5">
                    <Text className="text-neutral-400 font-medium">
                      Last Name
                    </Text>
                    <Text>{userProfile?.lastname}</Text>
                  </Stack>

                  <Stack spacing={5} className="mb-5">
                    <Text className="text-neutral-400 font-medium">Email</Text>
                    <Text>{userProfile?.email}</Text>
                  </Stack>

                  <Stack spacing={5} className="mb-5">
                    <Text className="text-neutral-400 font-medium">
                      Tanggal Lahir
                    </Text>
                    <Text>
                      {moment(userMemberProfile?.data?.birthDate).format(
                        'DD MMMM YYYY',
                      )}
                    </Text>
                  </Stack>

                  <Stack spacing={5} className="mb-5">
                    <Text className="text-neutral-400 font-medium">
                      No. Telp
                    </Text>
                    <Text>{userMemberProfile?.data?.phoneNumber}</Text>
                  </Stack>

                  <Stack spacing={5} className="mb-5">
                    <Text className="text-neutral-400 font-medium">Gender</Text>
                    <Text>
                      {`${userMemberProfile?.data?.gender
                        .split('')[0]
                        .toUpperCase()}${userMemberProfile?.data?.gender.slice(
                        1,
                        userMemberProfile?.data?.gender.split('').length,
                      )}`}
                    </Text>
                  </Stack>
                </SimpleGrid>
              </Box>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="edit-profile" className="py-14">
            <div className="pl-10">
              <Title order={3}>Edit Profile</Title>

              <Space h={30} />

              <Group>
                <div className=" w-fit relative">
                  <Avatar
                    size={100}
                    radius={'100%'}
                    src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${profilePicture}`}
                    className="border-[3px] border-solid border-gray-200"
                  />
                  <IconCameraFilled
                    className="absolute bottom-0 -right-1"
                    size={25}
                    style={{ color: COLORS.THIRD }}
                  />
                </div>

                <Stack spacing={10}>
                  <FileButton
                    onChange={handleChangeProfilePictureFile}
                    accept="image/png, image/jpeg"
                  >
                    {(props) => (
                      <Button {...props} className="w-full bg-primary h-[36px]">
                        Ganti Foto
                      </Button>
                    )}
                  </FileButton>

                  <Button
                    className="border-2 border-solid border-primary text-primary h-[36px]"
                    variant="outline"
                    onClick={handleDeleteProfilePicture}
                  >
                    Hapus Foto
                  </Button>
                </Stack>
              </Group>

              <ProfileForm
                initialValues={{
                  firstname: userProfileData?.user?.firstname,
                  lastname: userProfileData?.user?.lastname,
                  email: userProfileData?.user?.email,
                  phoneNumber: userProfileData?.phoneNumber,
                  gender: userProfileData?.gender,
                  birthDate: userProfileData?.birthDate,
                  profilePicture: userProfileData?.profilePicture,
                }}
              />
            </div>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </MainLayout>
  );
};

export default ProfilePages;
