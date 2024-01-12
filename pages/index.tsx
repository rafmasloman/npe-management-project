import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import SEO from '@/src/components/SEO/seo.component';
import NavbarHome from '@/src/layouts/navbar-home.layout';

export default function Home() {
  return (
    <>
      <SEO title="Homepage" description="NPE Management Project Website" />

      <main>
        <NavbarHome />
      </main>
    </>
  );
}
