import Link from "next/link";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Navbar from "@/components/Navbar";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import axios from "axios";

import { useToken } from "../hooks/useToken";

const ShoppingCart = () => {
  const [count, setCount] = useState(0);

  const token = useToken();

  if (token) {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/lists/count`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        setCount(0);
      });
  }

  return (
    <Link href="/history">
      <a className="shopping-icon">
        <ShoppingCartIcon />
        <span className="shopping-counter">{count}</span>
      </a>
    </Link>
  );
};

const Header = (props) => (
  <header>
    <Link href="/">
      <a>
        <img src="/images/logo.svg" alt="Shoppingify" />
      </a>
    </Link>

    <Navbar />

    <ShoppingCart />
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
