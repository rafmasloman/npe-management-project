import { navbarAdminLink, navbarStaffLink } from '@/src/utils/navbar.utils';
import {
  Anchor,
  Divider,
  Flex,
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
import ICDashboard from '@/src/assets/icons/nav-icon/dashboard.icon';
import { ICTeams } from '@/src/assets/icons/nav-icon/teams.icon';
import { ROUTES } from '@/src/constant/routes.constant';
import { ICUser } from '@/src/assets/icons/nav-icon/user.icon';
import { ICTransaction } from '@/src/assets/icons/nav-icon/transaction.icon';
import { ICPayroll } from '@/src/assets/icons/nav-icon/payroll.icon';
import { ICInvoices } from '@/src/assets/icons/nav-icon/invoices.icon';
import { ICProject } from '@/src/assets/icons/nav-icon/project.icon';
import { ICTask } from '@/src/assets/icons/nav-icon/task.icon';
import { ICMilestone } from '@/src/assets/icons/nav-icon/milestone.icon';
import { ICProfile } from '@/src/assets/icons/nav-icon/profile.icon';
import { ICClient } from '@/src/assets/icons/nav-icon/client.icon';

interface INavList {
  id: number;
  label: string;
  href?: string;
  icon: React.FC<any>;
}

const NavbarAdmin = () => {
  return (
    <div className="">
      <Link href={ROUTES.DASHBOARD} className="no-underline ">
        <NavLink
          label="Dashboard"
          icon={<ICDashboard width={25} height={25} />}
          styles={{
            label: {
              fontSize: rem(16),
              marginLeft: 10,
            },
          }}
          className="hover:bg-sky-50 w-[230px] rounded-lg"
        />
      </Link>

      <Space h={30} />

      <NavLink
        label="People"
        icon={<ICTeams width={25} height={25} />}
        styles={{
          label: {
            fontSize: rem(16),
            marginLeft: 10,
          },
        }}
        className="hover:bg-sky-50 w-[230px] rounded-lg"
        childrenOffset={28}
      >
        <Space h={16} />

        <Link href={ROUTES.USER} className="no-underline">
          <NavLink
            label="User Management"
            icon={<ICUser width={23} height={23} />}
            styles={{
              label: {
                fontSize: rem(16),
                marginLeft: 5,
              },
            }}
            className="hover:bg-sky-50 w-[230px] rounded-lg"
          />
        </Link>

        <Space h={16} />

        <Link href={ROUTES.MEMBER} className="no-underline">
          <NavLink
            label="Crew"
            icon={<ICTeams width={23} height={23} />}
            styles={{
              label: {
                fontSize: rem(16),
                marginLeft: 5,
              },
            }}
            className="hover:bg-sky-50 w-[230px] rounded-lg"
          />
        </Link>

        <Space h={16} />

        <Link href={ROUTES.CLIENT} className="no-underline">
          <NavLink
            label="Client"
            icon={<ICClient width={23} height={23} />}
            styles={{
              label: {
                fontSize: rem(16),
                marginLeft: 5,
              },
            }}
            className="hover:bg-sky-50 w-[230px] rounded-lg"
          />
        </Link>
      </NavLink>

      <Space h={30} />

      <NavLink
        label="Transaction"
        icon={<ICTransaction width={25} height={25} />}
        styles={{
          label: {
            fontSize: rem(16),
            marginLeft: 10,
          },
        }}
        className="hover:bg-sky-50 w-[230px] rounded-lg"
        childrenOffset={28}
      >
        <Space h={16} />

        <Link href={ROUTES.PAYROLL} className="no-underline">
          <NavLink
            label="Payroll"
            icon={<ICPayroll width={23} height={23} />}
            styles={{
              label: {
                fontSize: rem(16),
                marginLeft: 5,
              },
            }}
            className="hover:bg-sky-50 w-[230px] rounded-lg"
          />
        </Link>

        <Space h={16} />

        <Link href={ROUTES.INVOICES} className="no-underline">
          <NavLink
            label="Invoice"
            icon={<ICInvoices width={23} height={23} />}
            styles={{
              label: {
                fontSize: rem(16),
                marginLeft: 5,
              },
            }}
            className="hover:bg-sky-50 w-[230px] rounded-lg"
          />
        </Link>
      </NavLink>

      <Space h={30} />

      <Link href={ROUTES.PROJECTS} className="no-underline">
        <NavLink
          label="Projects"
          icon={<ICProject width={25} height={25} />}
          styles={{
            label: {
              fontSize: rem(16),
              marginLeft: 10,
            },
          }}
          className="hover:bg-sky-50 w-[230px] rounded-lg"
        />
      </Link>

      <Space h={40} />

      <Text className="text-lg font-semibold pl-3" c={COLORS.SECONDARY}>
        Teamspaces
      </Text>

      <Space h={20} />

      <Link href={`/admin${ROUTES.TASK}`} className="no-underline">
        <NavLink
          label="Task"
          icon={<ICTask width={30} height={30} />}
          styles={{
            label: {
              fontSize: rem(16),
              marginLeft: 10,
            },
          }}
          className="hover:bg-sky-50 w-[230px] rounded-lg"
        />
      </Link>

      <Space h={20} />

      <Link href={ROUTES.MILESTONE} className="no-underline ">
        <NavLink
          label="Milestone"
          icon={<ICMilestone />}
          styles={{
            label: {
              fontSize: rem(16),
              marginLeft: 10,
            },
          }}
          className="hover:bg-sky-50 hover:w-[230px] rounded-lg"
        />
      </Link>
    </div>
  );
};

const NavbarStaff = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <Link href={ROUTES.DASHBOARD} className="no-underline ">
        <NavLink
          label="Dashboard"
          icon={<ICDashboard width={25} height={25} />}
          styles={{
            label: {
              fontSize: rem(16),
              marginLeft: 10,
            },
          }}
          className="hover:bg-sky-50 w-[230px] rounded-lg"
        />
      </Link>

      <Space h={30} />

      <Link href={ROUTES.MEMBER} className="no-underline">
        <NavLink
          label="Crew"
          icon={<ICTeams width={25} height={25} />}
          styles={{
            label: {
              fontSize: rem(16),
              marginLeft: 10,
            },
          }}
          className="hover:bg-sky-50 w-[230px] rounded-lg"
        />
      </Link>

      <Space h={30} />

      <NavLink
        label="Transaction"
        icon={<ICTransaction width={25} height={25} />}
        styles={{
          label: {
            fontSize: rem(16),
            marginLeft: 10,
          },
        }}
        className="hover:bg-sky-50 w-[230px] rounded-lg"
        childrenOffset={28}
      >
        <Space h={16} />

        <Link href={ROUTES.PAYROLL} className="no-underline">
          <NavLink
            label="Payroll"
            icon={<ICPayroll width={23} height={23} />}
            styles={{
              label: {
                fontSize: rem(16),
                marginLeft: 5,
              },
            }}
            className="hover:bg-sky-50 w-[230px] rounded-lg"
          />
        </Link>

        <Space h={16} />

        <Link href={ROUTES.INVOICES} className="no-underline">
          <NavLink
            label="Invoice"
            icon={<ICInvoices width={23} height={23} />}
            styles={{
              label: {
                fontSize: rem(16),
                marginLeft: 5,
              },
            }}
            className="hover:bg-sky-50 w-[230px] rounded-lg"
          />
        </Link>
      </NavLink>

      <Space h={30} />

      <Link href={ROUTES.PROJECTS} className="no-underline">
        <NavLink
          label="Projects"
          icon={<ICProject width={25} height={25} />}
          styles={{
            label: {
              fontSize: rem(16),
              marginLeft: 10,
            },
          }}
          className="hover:bg-sky-50 w-[230px] rounded-lg"
        />
      </Link>

      <Space h={25} />

      <Divider className="w-[230px] bg-gray-200" h={2} />

      <Space h={25} />

      <Text className="text-lg font-semibold pl-3" c={COLORS.SECONDARY}>
        Account
      </Text>

      <Space h={20} />

      <Link href={`${ROUTES.PROFILE}/${user?.id!}`} className="no-underline">
        <NavLink
          label="Profile"
          icon={<ICProfile width={25} height={25} />}
          styles={{
            label: {
              fontSize: rem(16),
              marginLeft: 10,
            },
          }}
          className="hover:bg-sky-50 w-[230px] rounded-lg"
        />
      </Link>

      <Space h={20} />
    </div>
  );
};

const NavList = () => {
  const [projectsMember, setProjectsMember] = useState<any>([]);
  const user = useContext(UserContext);

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
      {user.user?.role !== 'ADMIN' ? NavbarStaff() : NavbarAdmin()}

      {/* <Divider ml={-30} />
      <NavLink
        label={'Workspace'}
        icon={<IconFileStack width={25} height={25} color={COLORS.DEEPBLUE} />}
        defaultOpened
        styles={{
          label: { fontSize: rem(16) },
        }}
      >
        {projectsMember?.data?.project?.map((project: any, index: number) => {
          return (
            <Link
              key={index}
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
      </NavLink> */}
    </Stack>
  );
};

export default NavList;
