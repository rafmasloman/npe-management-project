import AuthMutationAPI from '@/pages/api/auth/auth-mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePostLogin(options: { handleSucces: (data: any) => void }) {
  const { mutate: postLogin, isPending } = useMutation({
    mutationKey: ['login-id-key'],
    mutationFn: AuthMutationAPI.login,
    onSuccess: options.handleSucces,
  });

  return { postLogin, isPending };
}
