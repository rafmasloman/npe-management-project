import ProfileQueryApi from '@/pages/api/profile/profile.query';
import { useQuery } from '@tanstack/react-query';

export const useGetQueryProfile = (userId: string) => {
  return useQuery({
    queryKey: ['get-profile-id-key', userId],
    queryFn: () => ProfileQueryApi.getUserProfile(userId),
  });
};
