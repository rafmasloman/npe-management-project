import SEO from '@/src/components/SEO/seo.component';
import MainLayout from '@/src/layouts/main.layout';
import {
  Avatar,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
} from '@mantine/core';

const ProfilePages = () => {
  return (
    <MainLayout>
      <SEO title="Profile" description="Your user Profile Pages" />

      <Container>
        <Text> Profile Settings</Text>

        <Grid>
          <Grid.Col span={2}></Grid.Col>

          <Grid.Col span={10}>
            <Text>My Profile</Text>

            <Card>
              <Group>
                <Avatar />
                <Stack>
                  <Text>Rafly Masloman</Text>
                  <Text>Front end Developer</Text>
                </Stack>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default ProfilePages;
