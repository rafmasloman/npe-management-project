import ProfileQueryApi from '@/pages/api/profile/profile.query';
import { useQuery } from '@tanstack/react-query';

export const useGetQueryProfilePicture = (userId: string) => {
  return useQuery({
    queryKey: ['get-profile-picture-id-key', userId],
    queryFn: () => ProfileQueryApi.getUserProfilePicture(userId),
  });
};
