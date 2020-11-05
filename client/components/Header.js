import Link from 'next/link'
import PropTypes from "prop-types"
import React, { useState } from "react"

import Navbar from '@/components/Navbar';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import axios from 'axios';

import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const ShoppingCart = () => {

  const [count, setCount] = useState(0);

  axios.get(`${publicRuntimeConfig.BASE_API_URL}/api/lists/count`)
    .then(res => {
      setCount(res.data);
    })
    .catch(err => {
      console.log('error in request', err);
    });


  return (
    <Link href="/history">
      <a className="shopping-icon" >
        <ShoppingCartIcon />
        <span className="shopping-counter">{count}</span>

      </a>
    </Link>
  )
};

const Header = (props) => (
  <header>

    <Link href="/">
      <a><img src="/images/logo.svg" alt="Shoppingify" /></a>
    </Link>

    <Navbar />

    <ShoppingCart />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
