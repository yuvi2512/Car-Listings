import { AuthProvider } from '@/context/AuthContext';
import Head from 'next/head';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
