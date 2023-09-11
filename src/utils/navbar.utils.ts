import { ICalender } from '../assets/icons/nav-icon/calender.icon';
import { IClients } from '../assets/icons/nav-icon/clients.icon';
import ICDashboard from '../assets/icons/nav-icon/dashboard.icon';
import { ICMilestone } from '../assets/icons/nav-icon/milestone.icon';
import { ICProject } from '../assets/icons/nav-icon/project.icon';
import { ICTask } from '../assets/icons/nav-icon/task.icon';
import { ICTeams } from '../assets/icons/nav-icon/teams.icon';
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
    icon: IClients,
    label: 'Clients',
    href: ROUTES.ADMIN_CLIENT,
  },
  {
    id: 3,
    icon: ICalender,
    label: 'Member',
    href: ROUTES.ADMIN_CALENDER,
  },
  {
    id: 4,
    icon: ICalender,
    label: 'Calender',
    href: ROUTES.ADMIN_CALENDER,
  },
  {
    id: 5,
    icon: ICTask,
    label: 'Task',
    href: ROUTES.ADMIN_TASK,
  },
  {
    id: 6,
    icon: ICMilestone,
    label: 'Milestone',
    href: ROUTES.ADMIN_MILESTONE,
  },
  {
    id: 7,
    icon: ICTeams,
    label: 'Teams',
    href: ROUTES.ADMIN_TEAMS,
  },
  {
    id: 8,
    icon: ICProject,
    label: 'Project',
    href: ROUTES.ADMIN_PROJECTS,
  },
];
