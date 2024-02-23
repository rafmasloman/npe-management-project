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
  Card,
  Container,
  Divider,
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
import { IconPencil, IconUserCircle } from '@tabler/icons-react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const ProfilePages = () => {
  const { userProfile } = useProfileMember();
  const { data: userMemberProfile } = useGetQueryProfile(userProfile?.id);

  const { pathname } = useRouter();
  const [checked, setChecked] = useState(false);

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
                    <Avatar size={70} radius={'100%'} />
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

              <ProfileForm
                initialValues={{
                  firstname: userProfile?.firstname,
                  lastname: userProfile?.lastname,
                  email: userProfile?.email,
                  phoneNumber: userProfile?.phoneNumber,
                  gender: userMemberProfile?.data?.gender,
                  birthDate: userMemberProfile?.data?.birthDate,
                  profilePicture: userMemberProfile?.data?.profilePicture,
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
