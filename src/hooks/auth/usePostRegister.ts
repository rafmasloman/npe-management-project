import AuthMutationAPI from '@/pages/api/auth/auth-mutation';
import { IAuthRegisterParams } from '@/src/interfaces/auth.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostRegister = (taskId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`register-user-id-key`],
    mutationFn: (payload: IAuthRegisterParams) =>
      AuthMutationAPI.register(payload),
    onSuccess(data, variables, context) {
      //   queryClient.invalidateQueries({
      //     queryKey: [`get-comments-by-task-id-key-${taskId}`],
      //   });
    },
  });
};
