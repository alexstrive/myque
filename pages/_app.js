import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'

import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Provider as AuthProvider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MyQue</title>
      </Head>
      <AuthProvider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
