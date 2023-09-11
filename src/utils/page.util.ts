export const getCurrentRole = (pathname: string) => {
  const role = pathname.split('/')[1];
  return role;
};

export const getCurrentPage = (pathname: string) => {
  const pageTitle = pathname.split('/')[2];
  return pageTitle;
};
