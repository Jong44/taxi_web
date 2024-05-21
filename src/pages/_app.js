import "@/styles/globals.css";
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return <div className="text-black bg-white">
  <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://kit.fontawesome.com/c3cf8af875.js" crossorigin="anonymous"></script>
      </Head>
  <Component {...pageProps} />
</div>;
}
