import App from 'next/app'
import { SidePanelContextProvider } from '../components/ContextComponents/SidePanelContext'

import "../styles/app.scss";




class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <SidePanelContextProvider>
        
          <Component {...pageProps} />
        
      </SidePanelContextProvider>
    )
  }
}

export default MyApp

