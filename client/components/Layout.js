import React from 'react';
import PropTypes from "prop-types";
import Head from 'next/head'


import Header from "./Header"


import theme from '../muiTheme.js';
import { ThemeProvider } from '@material-ui/styles';

import { useSidePanelContext} from './ContextComponents/SidePanelContext'


/**
 * Layout component 
 */


const Layout = (props) => {
    const sidePanelState = useSidePanelContext();

    return (
        <>

            <ThemeProvider theme={theme}>

                <div className="layout">

                    <Head>
                        <title>{props.title}  - Shoppingify</title>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    </Head>

                    <aside className="left-panel">
                        <Header siteTitle={props.title || "Shoppingify"} />
                    </aside>

                    <div className="main">

                        <main>{props.children}</main>
                    </div>

                    <aside className="right-panel">
                        {props.rightPanel}
                    </aside>

                    <aside className={"side-panel " + (sidePanelState.active ? "active" : "")}>
                        {props.sidePanel || sidePanelState.content}
                    </aside>
                </div >
            </ThemeProvider >
        </>

    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
