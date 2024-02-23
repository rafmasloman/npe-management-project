import { navbarMainLink } from '@/src/utils/navbar.utils';
import { Button, Group, Space } from '@mantine/core';
import NavItem from './navbar-item.component';
import { COLORS } from '@/src/constant/colors.constant';
import {
  __getBrowserAuthCookie,
  __getSSRAuthCookie,
  __setSSRAuthCookie,
} from '@/src/utils/cookie.util';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import { ICLaunch } from '@/src/assets/icons/launch.icon';
import ICDashboardButton from '@/src/assets/icons/nav-icon/dashboard_btn.icon';
import { useEffect, useState } from 'react';

const NavbarMainList = () => {
  const [isTokenAvaiable, setIsTokenAvaiable] = useState(false);
  const token = __getBrowserAuthCookie(TOKEN_NAME);

  useEffect(() => {
    if (!!token) {
      setIsTokenAvaiable(!isTokenAvaiable);
    }
  }, [token]);

  console.log('is token : ', isTokenAvaiable);

  return (
    <Group>
      <Button
        component={'a'}
        href={!!isTokenAvaiable ? '/dashboard' : '/login'}
        bg={COLORS.PRIMARY}
        className="font-medium text-base"
        rightIcon={<ICDashboardButton width={20} height={20} />}
      >
        Go to Dashboard
      </Button>
    </Group>
  );
};

export default NavbarMainList;
