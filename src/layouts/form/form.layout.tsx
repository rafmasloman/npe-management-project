import SEO from '@/src/components/SEO/seo.component';
import HeaderPage from '@/src/components/header/header-page.component';
import { COLORS } from '@/src/constant/colors.constant';
import { getCurrentRole, getCurrentPage } from '@/src/utils/page.util';
import { Anchor, Container, Group, Space } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useRouter } from 'next/router';

const FormLayout = ({
  children,
  pathname,
  pageTitle,
  title,
  anchorData,
}: IFormLayoutProps) => {
  const { pathname: currentPage } = useRouter();

  console.log(
    'pathanem : ',
    currentPage.split('/')[currentPage.split('/').length - 1],
  );

  return (
    <>
      <SEO title={title} description="" />

      <Container className="px-4 md:px-10 lg:px-16 lg:-mt-12" size={'xl'}>
        <HeaderPage pageTitle={pageTitle} role={getCurrentRole(pathname)}>
          <Group>
            {anchorData?.map((anchor) => {
              console.log('tes : ', currentPage);

              return (
                <>
                  <Anchor
                    href={anchor.href}
                    className={`text-gray-500 px-4 py-1.5 rounded-full  ${
                      `/${
                        currentPage.split('/')[
                          currentPage.split('/').length - 1
                        ]
                      }` === anchor.isActiveText
                        ? 'bg-slate-200'
                        : ''
                    }`}
                  >
                    {anchor.text}
                  </Anchor>

                  <IconChevronRight
                    className={`text-gray-400 ${
                      `/${
                        currentPage.split('/')[
                          currentPage.split('/').length - 1
                        ]
                      }` === anchor.isActiveText
                        ? 'hidden'
                        : 'block'
                    }`}
                  />
                </>
              );
            })}
          </Group>
        </HeaderPage>

        <Space h={50} />

        {children}
      </Container>
    </>
  );
};

export default FormLayout;
