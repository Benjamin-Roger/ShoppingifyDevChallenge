import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import Header from "@/components/Header";

import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import theme from "../muiTheme.js";
import { ThemeProvider } from "@material-ui/styles";

import { useSidePanelContext } from "@/context/SidePanelContext";

import { PopUp } from "@/components/Notification";

/**
 * Layout component
 */

const Layout = (props) => {
  const sidePanelState = useSidePanelContext();

  const [rightPanel, toggleRightPanel] = useState(false); // state for mobile right panel

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="layout">
          <Head>
            <title>{props.title} - Shoppingify</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width, height=device-height"
            />
          </Head>

          <aside className="left-panel">
            <Header siteTitle={props.title || "Shoppingify"} />
          </aside>

          <div className="main">
            <main>{props.children}</main>
          </div>

          <aside className="right-panel desktop">{props.rightPanel}</aside>

          <Drawer anchor="right" open={rightPanel}>
            <aside className="right-panel mobile">{props.rightPanel}</aside>
          </Drawer>

          <Drawer anchor="right" open={sidePanelState.active}>
            <div className="side-panel">
              {props.sidePanel || sidePanelState.content}
            </div>
          </Drawer>
        </div>

        {props.rightPanel ? (
          <div className="fab-wrapper">
            <Fab
              color="primary"
              size="small"
              onClick={() => toggleRightPanel(!rightPanel)}
            >
              {rightPanel ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </Fab>
          </div>
        ) : (
          false
        )}

        <PopUp />
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
