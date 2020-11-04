import Link from 'next/link'
import React from "react"

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import HistoryIcon from '@material-ui/icons/History';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import InfoIcon from '@material-ui/icons/Info';


import { useRouter } from 'next/router';



const Navbar = (props) => {

    const nav_links = [
        {
            slug: "/",
            tooltip: "Items",
            icon: <FormatListBulletedIcon />
        },
        {
            slug: "/history",
            tooltip: "History",
            icon: <HistoryIcon />
        },
        {
            slug: "/stats",
            tooltip: "Statistics",
            icon: <InsertChartOutlinedIcon />
        },

        {
            slug: "/about",
            tooltip: "About",
            icon: <InfoIcon />
        },

    ]

    return (
        <nav className="side-nav">

            <ul>
                {nav_links.map(link => <li
                    className={
                        ((link.slug.length > 1 && useRouter().pathname.includes(link.slug)) || useRouter().pathname === link.slug) ? 'active' : ''
                    }
                    key={link.slug}>
                    <Link href={link.slug}>
                        <a title={link.tooltip}>{link.icon}</a>
                    </Link>
                </li>)}
            </ul>
        </nav >
    )
}


export default Navbar;
