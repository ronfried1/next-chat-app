import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/graphql/apollo-client";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ThemeProvider enableSystem={true} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

// {/* // <Provider store={store}> */}
// {/* </Provider> */}
