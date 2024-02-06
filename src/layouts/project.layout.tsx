import { Button, Container, Group, Space, TextInput } from '@mantine/core';
import SEO from '../components/SEO/seo.component';
import HeaderPage from '../components/header/header-page.component';
import { getCurrentPage, getCurrentRole } from '../utils/page.util';
import ButtonNavigate from '../components/button/button-link.component';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { UserContext } from '../context/user-credential.context';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { COLORS } from '../constant/colors.constant';
import { useForm } from '@mantine/form';

const ProjectLayout = ({ pathname, children }: ILayoutProps) => {
  const user = useContext(UserContext);

  const { query, push } = useRouter();
  const searchParams = useSearchParams();

  const searchForm = useForm({
    initialValues: {
      searchValue: '',
    },
  });
  // const [searchValue, setSearchValue] = useState(query.q || '');

  // const handleSearchSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(event.currentTarget.value);

  //   push({
  //     query: { q: event.currentTarget.value },
  //   });
  // };

  const handleSearchSubmit = searchForm.onSubmit((values) => {
    if (values.searchValue.trim() !== '') {
      push({
        query: { q: values.searchValue },
      });
    } else {
      push('/project');
    }
  });

  return (
    <>
      <SEO title="projects" description="" />

      <Container size={'xl'} className="px-4 md:px-10 lg:px-16">
        <HeaderPage
          pageTitle={getCurrentPage(pathname)}
          role={getCurrentRole(pathname)}
        />

        <Space h={50} />

        <Group position="apart" className="">
          {user.user?.role.includes('STAFF') ? null : (
            <ButtonNavigate
              icon={<IconPlus />}
              url={`/${getCurrentPage(pathname)}/add-project`}
            >
              Tambah Project
            </ButtonNavigate>
          )}
          <form onSubmit={handleSearchSubmit} className="w-fit ">
            <Group className="w-full " position="right">
              <TextInput
                placeholder="Cari Project"
                radius={'md'}
                className="w-full lg:w-[320px]"
                {...searchForm.getInputProps('searchValue')}
                styles={{
                  input: {
                    height: 40,
                  },
                }}
              />

              {/* <Button
                bg={COLORS.PRIMARY}
                type="submit"
                className="font-medium text-base"
                rightIcon={<IconSearch size={20} />}
              >
                Cari
              </Button> */}

              <button
                type="submit"
                className="bg-primary shadow-sm border-0 w-[40px] h-[40px] flex items-center justify-center rounded-lg"
              >
                <IconSearch size={21} color={'white'} />
              </button>
            </Group>
          </form>
        </Group>
        {children}
      </Container>
    </>
  );
};

export default ProjectLayout;
