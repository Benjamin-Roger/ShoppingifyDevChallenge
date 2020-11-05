import App from 'next/app'
import { SidePanelContextProvider } from '@/context/SidePanelContext'
import { NotificationContextProvider } from '@/context/Notification/context'
import { ListContextProvider } from '@/context/CurrentShoppingList/context'

import "../styles/app.scss";


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <SidePanelContextProvider>
        <NotificationContextProvider>
          <ListContextProvider>

            <Component {...pageProps} />
          </ListContextProvider>

        </NotificationContextProvider>
      </SidePanelContextProvider>
    )
  }
}

export default MyApp

