import theme from '../muiTheme';

import Layout from '@/components/Layout'

import { CurrentShoppingList } from '@/context/CurrentShoppingList/context.js'

import { PieChart, Pie, LabelList } from 'recharts';


const StatsPage = ({ data }) => {

    // Initialize the body
    var body = '';

    const { amountByItem, amountByCategory } = data;

    const dataItems = Object.keys(amountByItem).map((key) => {
        return {
            "name": key,
            "value": amountByItem[key]
        }
    });

    const dataCategories = Object.keys(amountByCategory).map((key) => {
        return {
            "name": key,
            "value": amountByCategory[key]
        }
    });

    // Apply the content for the body

    body = (<>
        <div style={{ display: 'flex' }}>
            <div>
                <h3>Top items</h3>
                <PieChart width={450} height={275}>
                    <LabelList dataKey="name" position="top" />
                    <Pie data={dataItems} dataKey="value" nameKey="name" cx="50%" cy="50%" fill={theme.palette.primary.main} label={(entry) => entry.name} />

                </PieChart>

            </div>

            <div>
                <h3>Top categories</h3>
                <PieChart width={450} height={275}>
                    <LabelList dataKey="name" position="top" />
                    <Pie data={dataCategories} dataKey="value" nameKey="name" cx="50%" cy="50%" fill={theme.palette.secondary.main} label={(entry) => entry.name} />

                </PieChart>
            </div>
        </div>
    </>)


    return (
        <>
                <Layout title="Statistics" rightPanel={<CurrentShoppingList />} >

                    <h1>Statistics</h1>

                    {body}

                </Layout>
        </>
    )
}

export async function getServerSideProps(context) {

    // Fetch data from external API
    const res = await fetch(`${process.env.BASE_API_URL}/api/stats`);
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}

export default StatsPage;

