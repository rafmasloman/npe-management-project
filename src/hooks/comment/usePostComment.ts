import CommentMutationAPI from '@/pages/api/comment/comment-mutation';
import CommentQueryAPI from '@/pages/api/comment/comment-query';
import MemberQueryAPI from '@/pages/api/member/member-query';
import { IPostCommentMutationParams } from '@/src/interfaces/comment.interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostComment = (taskId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`post-comment-id-key`],
    mutationFn: (payload: IPostCommentMutationParams) =>
      CommentMutationAPI.sendCommentMessage(payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [`get-comments-by-task-id-key-${taskId}`],
      });
    },
  });
};
