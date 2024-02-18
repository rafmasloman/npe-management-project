import CommentQueryAPI from '@/pages/api/comment/comment-query';
import MemberQueryAPI from '@/pages/api/member/member-query';
import { useQuery } from '@tanstack/react-query';

export const useGetCommentByTask = (taskId: number) => {
  return useQuery({
    queryKey: [`get-comments-by-task-id-key-${taskId}`, taskId],
    queryFn: () => CommentQueryAPI.getCommentByTask(taskId),
  });
};
