import { ICalender } from '../assets/icons/nav-icon/calender.icon';

import ICDashboard from '../assets/icons/nav-icon/dashboard.icon';
import { ICMilestone } from '../assets/icons/nav-icon/milestone.icon';
import { ICProject } from '../assets/icons/nav-icon/project.icon';
import { ICTask } from '../assets/icons/nav-icon/task.icon';
import { ICTeams } from '../assets/icons/nav-icon/teams.icon';
import { ICUser } from '../assets/icons/nav-icon/user.icon';
import { ROUTES } from '../constant/routes.constant';

export const navbarLink = [
  {
    id: 1,
    icon: ICDashboard,
    label: 'Dashboard',
    href: ROUTES.ADMIN_DASHBOARD,
  },
  {
    id: 2,
    icon: ICUser,
    label: 'User Management',
    href: ROUTES.ADMIN_USER,
  },
  // {
  //   id: 3,
  //   icon: ICalender,
  //   label: 'Member',
  //   href: ROUTES.ADMIN_MEMBER,
  // },
  {
    id: 4,
    icon: ICalender,
    label: 'Calender',
    href: ROUTES.ADMIN_CALENDER,
  },
  // {
  //   id: 5,
  //   icon: ICTask,
  //   label: 'Task',
  //   href: ROUTES.ADMIN_TASK,
  // },
  {
    id: 6,
    icon: ICMilestone,
    label: 'Milestone',
    href: ROUTES.ADMIN_MILESTONE,
  },
  // {
  //   id: 7,
  //   icon: ICTeams,
  //   label: 'Teams',
  //   href: ROUTES.ADMIN_TEAMS,
  // },
  {
    id: 8,
    icon: ICProject,
    label: 'Project',
    href: ROUTES.ADMIN_PROJECTS,
  },
];

export const navbarMainLink = [
  { id: 1, label: 'Homepage', href: ROUTES.HOMEPAGE },
  { id: 2, label: 'Contact Us', href: ROUTES.CONTACT_US },
];
