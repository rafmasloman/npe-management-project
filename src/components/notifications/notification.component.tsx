import { COLORS } from '@/src/constant/colors.constant';
import { notifications } from '@mantine/notifications';

interface INotificationsProps {
  title: string;
  message: string;
  status: 'SUCCESS' | 'FAILED';
}

const Notifications = ({ title, message, status }: INotificationsProps) => {
  return notifications.show({
    title,
    message,
    color: status === 'SUCCESS' ? COLORS.SUCCESS : COLORS.DANGER,
    withCloseButton: true,
    styles: {
      root: {
        '&::before': {
          backgroundColor:
            status === 'SUCCESS' ? COLORS.SUCCESS : COLORS.DANGER,
        },
      },
    },
  });
};

export default Notifications;
