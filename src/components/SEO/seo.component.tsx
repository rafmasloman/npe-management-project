import Head from 'next/head';

interface ISEOProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}
const SEO = ({ title, description, children }: ISEOProps) => {
  return (
    <Head>
      <title>NPE-Simplify | {title}</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {children}
      <link rel="icon" href="/npe_logo.svg" />
    </Head>
  );
};

export default SEO;
