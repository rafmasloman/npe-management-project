import React from 'react';

export interface IUserProfileBadgeProps
  extends React.ComponentPropsWithoutRef<'button'> {
  name: string;
  role: string;
}


