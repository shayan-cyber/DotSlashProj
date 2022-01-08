import '../styles/globals.css'
import Navbar from '../Components/Navbar'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (


    <>
      <Head>
        
      <link rel="shortcut icon" href="/images/code.png" type="image/x-icon"/>  
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        <title>CodeTogether</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
