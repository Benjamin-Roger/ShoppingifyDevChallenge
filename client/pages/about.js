import theme from '../muiTheme';

import Layout from '@/components/Layout'

import React from "react"


const AboutPage = () => {

    return (
        <>
            <Layout title="About" rightPanel={''} >

                <h1>About this website</h1>

                <p>This website is my solution to the challenges offered by <a rel="nofollow" target="_blank" href="https://devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x">DevChallenges</a></p>

                <p>See my solution on <a rel="nofollow" target="_blank" href="https://github.com/Benjamin-Roger/shoppingifyDevChallenge">Github</a>.</p>

                <p>This solution has been made by <a rel="nofollow" target="_blank" href="https://resume.benjaminroger.com/" style={{ color: theme.palette.primary.main }}>Benjamin R.</a> and can be used freely by others.</p>

            </Layout>
        </>
    )
}

export default AboutPage;

