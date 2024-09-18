import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/homepages/homepage1');
  }, [router]);

  return (
    <div>
      <Head>
        <title>Redirecting...</title>
      </Head>
      <p>Redirecting...</p>
    </div>
  );
}