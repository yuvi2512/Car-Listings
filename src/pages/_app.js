import { AuthProvider } from '@/context/AuthContext';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
