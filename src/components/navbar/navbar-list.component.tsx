import { navbarLink } from '@/src/utils/navbar.utils';
import {
  Anchor,
  Divider,
  Image,
  List,
  NavLink,
  Space,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import NavItem from './navbar-item.component';
import { IconInterfaceProps } from '@/src/interfaces/icon.interface';
import { Icon123, IconFileStack } from '@tabler/icons-react';
import { COLORS } from '@/src/constant/colors.constant';
import NPEProLogo from '@/src/assets/images/npe_pm_logo.png';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/src/context/user-credential.context';
import { useGetMemberProjectQuery } from '@/src/hooks/member/useGetQueryMemberProject';
import { ICAlert } from '@/src/assets/icons/alert_delete.icon';

interface INavList {
  id: number;
  label: string;
  href: string;
  icon: React.FC<any>;
}

const NavList = () => {
  const [projectsMember, setProjectsMember] = useState<any>([]);
  const user = useContext(UserContext);

  console.log('user : ', user.user?.id);

  const { data: memberProjects, isSuccess } = useGetMemberProjectQuery(
    user.user?.id!,
  );

  useEffect(() => {
    setProjectsMember(memberProjects);
  }, [isSuccess, memberProjects]);

  return (
    <Stack
      style={{ textDecoration: 'none', listStyle: 'none' }}
      spacing={'xs'}
      className=""
    >
      {navbarLink.map(({ id, label, icon: Icon, href }: INavList) => {
        return (
          <>
            <NavItem
              label={label}
              key={id}
              href={href}
              icon={<Icon width={25} height={25} />}
            />
            <Space h={20} />
          </>
        );
      })}

      <Divider ml={-30} />
      <NavLink
        label={'Workspace'}
        icon={<IconFileStack width={25} height={25} color={COLORS.DEEPBLUE} />}
        defaultOpened
        styles={{
          label: { fontSize: rem(16) },
        }}
      >
        {projectsMember?.data?.project?.map((project: any) => {
          return (
            <Link
              key={project.id}
              href={`/project/${project.id}/detail`}
              style={{ textDecoration: 'none' }}
            >
              <NavLink
                label={project.projectName}
                icon={
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${project.projectIcon}`}
                    width={16}
                    height={'fit-content'}
                    alt={project.projectName}
                  />
                }
              />
            </Link>
          );
        })}
      </NavLink>
    </Stack>
  );
};

export default NavList;
