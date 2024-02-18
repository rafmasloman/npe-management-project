import { ICClient } from '../assets/icons/nav-icon/client.icon';
import { ICInvoices } from '../assets/icons/nav-icon/invoices.icon';
import { ICProject } from '../assets/icons/nav-icon/project.icon';
import { ICTeams } from '../assets/icons/nav-icon/teams.icon';
import { COLORS } from '../constant/colors.constant';

export const DASHBOARD_DATA_FEATURE = [
  {
    id: 1,
    title: 'Projects',
    icon: ICProject,
    totalData: 70,
    color: COLORS.PRIMARY,
  },
  {
    id: 2,
    title: 'Clients',
    icon: ICClient,
    totalData: 6,
    color: COLORS.THIRD,
  },
  {
    id: 3,
    title: 'Crews',
    icon: ICTeams,
    totalData: 15,
    color: COLORS.SECONDARY,
  },
  {
    id: 4,
    title: 'Invoices',
    icon: ICInvoices,
    totalData: 20,
    color: COLORS.SUCCESS,
  },
];
