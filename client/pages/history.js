import Link from 'next/link'

import Layout from '../components/Layout'

import HistoryListItem from '../components/HistoryListItem'
import { sortByTimeStampKey } from "../utils/sortItems";


import { ListContextProvider, CurrentShoppingList } from '../components/ContextComponents/CurrentShoppingList/context.js'


const HistoryPage = ({ data }) => {

  // Initialize the body
  var body = '';

  // Apply the content for the body

  if (data.message) {
    body = <p>{data.message}</p>

  } else {

    var sorted_array = sortByTimeStampKey(data, 'timestamp').reverse();

    body = (<div className="history-list">

      {
        sorted_array.map((item, key) => <HistoryListItem
          key={key}
          item={item}
        />)
      }

    </div>)
  }

  return (
    <>
      <ListContextProvider>
        <Layout title="History" rightPanel={<CurrentShoppingList />} >

          <h1>Shopping History</h1>

          {body}


        </Layout>
      </ListContextProvider>
    </>
  )
}

export async function getServerSideProps(context) {

  // Fetch data from external API
  const res = await fetch(`${process.env.BASE_API_URL}/api/lists`);
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default HistoryPage

