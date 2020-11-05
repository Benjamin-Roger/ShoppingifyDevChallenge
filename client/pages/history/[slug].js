// Local components
import Layout from '@/components/Layout'
import ItemCard from '@/components/ItemCard'

// Material UI components
import Button from '@material-ui/core/Button';
import EventNoteIcon from '@material-ui/icons/EventNote';

// Utils
import getUniqueKeys from "@/utils/sortItems";

// Context
import { ListDispatch, ListContextProvider, CurrentShoppingList } from '@/context/CurrentShoppingList/context.js'
import { useContext } from 'react';

const OpenListButton = ({ data }) => {

    const listDispatch = useContext(ListDispatch);

    const openList = () => {
        listDispatch({
            type: 'OPEN_LIST',
            payload: { ...data }
        });
    }
    return (
        <Button color="primary" variant="contained" className="btn-dark" onClick={() => openList()}>Open the list</Button>
    )
}

const ListPage = ({ data }) => {

    var body = '';


    if(!data.message) {

        // Get items from the list
        var arrItems = data.items;
        const [arr, uniqueCategories] = getUniqueKeys(arrItems, 'category');

        // Get timestamp
        var timestamp = new Date(data.timestamp);
        var date = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(timestamp)
            + " " +
            (timestamp.getDay() + 1)
            + "." +
            (timestamp.getMonth() + 1)
            + "." +
            (timestamp.getFullYear() + 1);


        var body = (<>

            <p className="timestamp">
                <EventNoteIcon />
                {date}
            </p>

            <OpenListButton data={data} />

            <div className="item-list">

                {
                    uniqueCategories.map((category, key) =>
                        (
                            <div className="item-row" key={key}>
                                <h2>{category}</h2>

                                {arr
                                    .filter((item) => item.category == category)
                                    .map((item, key2) => <ItemCard
                                        key={key2}
                                        item={item}
                                        rightComponent={<span
                                            className="text-main-color">
                                            {item.amount} pcs
                                                </span>}
                                    />
                                    )
                                }

                            </div>
                        )
                    )
                }

            </div>
        </>
        )
    } else {
        body = <p>{data.message}</p>
    }



    return (
        <>
            <ListContextProvider>
                <Layout title={data?.name || "Shopping List"} rightPanel={<CurrentShoppingList title={data.title} />} >

                    <h1>{data?.name || "Shopping List"}</h1>

                    {body}


                </Layout>
            </ListContextProvider>
        </>
    )
}



// This gets called on every request
export async function getServerSideProps(context) {

    // Fetch data from external API
    const res = await fetch(`${process.env.BASE_API_URL}/api/lists/view/${context.query.slug}`);
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}


export default ListPage

