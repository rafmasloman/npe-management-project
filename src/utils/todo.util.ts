import { COLORS } from '../constant/colors.constant';

export const TODO_UTILS = {
  STATUS_COLOR: (status: string) => {
    const todo = status.toLowerCase().includes('ToDo'.toLowerCase());
    const on_progress = status
      .toLowerCase()
      .includes('On_Progress'.toLowerCase());
    const completed = status.toLowerCase().includes('Completed'.toLowerCase());

    if (todo) {
      return COLORS.TODO;
    } else if (on_progress) {
      return COLORS.ON_PROGRESS;
    } else if (completed) {
      return COLORS.COMPLETED;
    }
  },
};
