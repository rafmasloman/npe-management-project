import ProfileMutation from '@/pages/api/profile/profile.mutation';
import { IUpdateProfilePayload } from '@/src/interfaces/api/profile/profile.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePutUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['put-update-profile-id-key'],
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: IUpdateProfilePayload;
    }) => ProfileMutation.updateProfile(userId, payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['get-profile-id-key'] });
    },
  });
};
