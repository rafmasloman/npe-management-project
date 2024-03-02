import ProfileMutation from '@/pages/api/profile/profile.mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-profile-picture-id-key'],
    mutationFn: ({ userId, payload }: { userId: string; payload: FormData }) =>
      ProfileMutation.updateProfilePicture(userId, payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['get-profile-picture-id-key'],
      });
    },
  });
};
