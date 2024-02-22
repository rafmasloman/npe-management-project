import { UserContext } from '@/src/context/user-credential.context';
import { useContext, useEffect, useState } from 'react';

export const useProfileMember = () => {
  const user = useContext(UserContext);

  const [userProfile, setUserProfile] = useState<any>({});

  useEffect(() => {
    setUserProfile(user?.user);
  }, [user]);

  return { userProfile };
};
