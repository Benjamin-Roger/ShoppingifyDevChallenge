import App from 'next/app'
import { SidePanelContextProvider } from '@/context/SidePanelContext'
import { NotificationContextProvider } from '@/context/Notification/context'


import "../styles/app.scss";




class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <SidePanelContextProvider>
        <NotificationContextProvider>

          <Component {...pageProps} />
          
        </NotificationContextProvider>
      </SidePanelContextProvider>
    )
  }
}

export default MyApp

