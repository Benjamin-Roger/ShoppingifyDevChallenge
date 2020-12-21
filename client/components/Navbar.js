import Link from "next/link";
import React from "react";

import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import HistoryIcon from "@material-ui/icons/History";
import InsertChartOutlinedIcon from "@material-ui/icons/InsertChartOutlined";
import InfoIcon from "@material-ui/icons/Info";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { useRouter } from "next/router";

import { isAuthenticated } from "@/hooks/isAuthenticated";

import {useState, useEffect} from 'react';

const Navbar = (props) => {
  const nav_links = [
    {
      slug: "/",
      tooltip: "Items",
      icon: <FormatListBulletedIcon />,
    },
    {
      slug: "/history",
      tooltip: "History",
      icon: <HistoryIcon />,
    },
    {
      slug: "/stats",
      tooltip: "Statistics",
      icon: <InsertChartOutlinedIcon />,
    },

    {
      slug: "/about",
      tooltip: "About",
      icon: <InfoIcon />,
    },
    {
        slug: "/account",
        tooltip: "Account",
        icon: <AccountCircleIcon />,
      },
  ];

  const isUserConnected = isAuthenticated();

  return (
    <>
      <nav className="side-nav">
        <ul>
          {nav_links.map((link) => (
            <li
              className={
                (link.slug.length > 1 &&
                  useRouter().pathname.includes(link.slug)) ||
                useRouter().pathname === link.slug
                  ? "active"
                  : ""
              }
              key={link.slug}
            >
              <Link href={link.slug}>
                <a title={link.tooltip}>{link.icon}</a>
              </Link>
            </li>
          ))}

          {!isUserConnected ? (
            <li>
              <Link href="/signup">
                <a title="Sign up">
                  <PersonAddIcon />
                </a>
              </Link>
            </li>
          ) : (
            false
          )}
        </ul>
      </nav>

    </>
  );
};

export default Navbar;
