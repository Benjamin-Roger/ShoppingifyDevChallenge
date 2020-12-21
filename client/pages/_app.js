import App from "next/app";
import Head from "next/head";
import { SidePanelContextProvider } from "@/context/SidePanelContext";
import { NotificationContextProvider } from "@/context/Notification/context";
import { ListContextProvider } from "@/context/CurrentShoppingList/context";

import "../styles/app.scss";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <SidePanelContextProvider>
          <NotificationContextProvider>
            <ListContextProvider>
              <Component {...pageProps} />
            </ListContextProvider>
          </NotificationContextProvider>
        </SidePanelContextProvider>
      </>
    );
  }
}

export default MyApp;
