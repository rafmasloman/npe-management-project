import { ICClient } from '../assets/icons/nav-icon/client.icon';
import ICDashboard from '../assets/icons/nav-icon/dashboard.icon';
import { ICInvoices } from '../assets/icons/nav-icon/invoices.icon';
import { ICMilestone } from '../assets/icons/nav-icon/milestone.icon';
import { ICPayroll } from '../assets/icons/nav-icon/payroll.icon';
import { ICProject } from '../assets/icons/nav-icon/project.icon';
import { ICTask } from '../assets/icons/nav-icon/task.icon';
import { ICTeams } from '../assets/icons/nav-icon/teams.icon';
import { ICTransaction } from '../assets/icons/nav-icon/transaction.icon';
import { ICUser } from '../assets/icons/nav-icon/user.icon';
import { ROUTES } from '../constant/routes.constant';

export const navbarAdminLink = [
  {
    id: 1,
    icon: ICDashboard,
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
  },
  {
    id: 2,
    icon: ICUser,
    label: 'User Management',
    href: ROUTES.USER,
  },
  {
    id: 3,
    icon: ICTeams,
    label: 'My People',
    href: ROUTES.MEMBER,
  },
  {
    id: 4,
    icon: ICInvoices,
    label: 'Invoices',
    href: ROUTES.INVOICES,
  },
  {
    id: 5,
    icon: ICTask,
    label: 'Task',
    href: ROUTES.TASK,
  },
  {
    id: 6,
    icon: ICPayroll,
    label: 'Payroll',
    href: ROUTES.PAYROLL,
  },
  {
    id: 7,
    icon: ICMilestone,
    label: 'Milestone',
    href: ROUTES.MILESTONE,
  },
  {
    id: 8,
    icon: ICClient,
    label: 'Client',
    href: ROUTES.CLIENT,
  },
  {
    id: 9,
    icon: ICProject,
    label: 'Project',
    href: ROUTES.PROJECTS,
  },
];

export const navbarAdminTeamspace = [
  {
    id: 1,
    icon: ICTransaction,
    label: 'Payments',
  },
  {
    id: 1,
    icon: ICTask,
    label: 'Task',
  },
  {
    id: 2,
    icon: ICMilestone,
    label: 'Milestone',
  },
];

export const navbarStaffLink = [
  {
    id: 1,
    icon: ICDashboard,
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
  },
  {
    id: 2,
    icon: ICProject,
    label: 'Projects',
    href: ROUTES.PROJECTS,
  },
  {
    id: 3,
    icon: ICTask,
    label: 'My Task',
    href: ROUTES.TASK,
  },
  {
    id: 4,
    icon: ICMilestone,
    label: 'Milestones',
    href: ROUTES.MILESTONE,
  },
];

export const navbarMainLink = [{ id: 1, label: 'Login', href: ROUTES.LOGIN }];
