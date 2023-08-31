import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Starwars Database</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Starwars Database" />
        <meta property="og:title" content="Starwars Database" />
        <meta property="og:description" content="Starwars Database" />
        <meta property="og:image" content="/banner.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
