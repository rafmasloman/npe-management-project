import CommentQueryAPI from '@/pages/api/comment/comment-query';
import MemberQueryAPI from '@/pages/api/member/member-query';
import { useQuery } from '@tanstack/react-query';

export const useGetCommentById = (commentId: number) => {
  return useQuery({
    queryKey: ['get-comment-by-id-key'],
    queryFn: () => CommentQueryAPI.getCommentById(commentId),
  });
};
