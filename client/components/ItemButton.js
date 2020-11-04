import PropTypes from "prop-types"
import React from "react"
import Link from 'next/link'


import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';



const ItemButton = (props) => (

    <IconButton aria-label="add an item" {...props}>
        <Link href="">
            <AddIcon />
        </Link>
    </IconButton>
);




export default ItemButton;

