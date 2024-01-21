import { navbarMainLink } from '@/src/utils/navbar.utils';
import { Button, Group, Space } from '@mantine/core';
import NavItem from './navbar-item.component';
import { COLORS } from '@/src/constant/colors.constant';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { ICLaunch } from '@/src/assets/icons/launch.icon';
import ICDashboardButton from '@/src/assets/icons/nav-icon/dashboard_btn.icon';
import { useEffect, useState } from 'react';

const NavbarMainList = () => {
  const [initialToken, setInitialToken] = useState('');
  const token = __getBrowserAuthCookie(TOKEN_NAME);

  console.log('token : ', token);

  useEffect(() => {
    setInitialToken(token as string);
  }, [token]);

  return (
    <Group>
      {!initialToken
        ? navbarMainLink.map((navItem) => {
            return (
              <NavItem
                key={navItem.id}
                label={navItem.label}
                href={navItem.href}
              />
            );
          })
        : null}

      <Button
        component={'a'}
        href={!initialToken ? '/register' : '/dashboard'}
        bg={COLORS.PRIMARY}
        className="font-medium text-base"
        rightIcon={
          !initialToken ? null : <ICDashboardButton width={20} height={20} />
        }
      >
        {!initialToken ? 'Register' : 'Go to Dashboard'}
      </Button>
    </Group>
  );
};

export default NavbarMainList;
