interface ILayoutProps {
  pathname: string;
  children: React.ReactNode;
}

interface IFormLayoutProps {
  pathname: string;
  children: React.ReactNode;
  pageTitle: string;
  title: string;
  description?: string;
}
