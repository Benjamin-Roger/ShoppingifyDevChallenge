// Local components
import Layout from "@/components/Layout";
import ItemCard from "@/components/ItemCard";

// Material UI components
import Button from "@material-ui/core/Button";
import EventNoteIcon from "@material-ui/icons/EventNote";

// Utils
import getUniqueKeys from "@/utils/sortItems";

// Context
import {
  ListDispatch,
  CurrentShoppingList,
} from "@/context/CurrentShoppingList/context.js";
import { useContext } from "react";

// Data fetching
import useSWR from "swr";
import { authFetch } from "@/utils/authFetch";

const OpenListButton = ({ data }) => {
  const listDispatch = useContext(ListDispatch);

  const openList = () => {
    listDispatch({
      type: "OPEN_LIST",
      payload: { ...data },
    });
  };
  return (
    <Button
      color="primary"
      variant="contained"
      className="btn-dark"
      onClick={() => openList()}
    >
      Open the list
    </Button>
  );
};

const ListPage = ({ slug }) => {
  let body = "";

  // Get data
  const res = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/lists/view/${slug}`,
    authFetch
  );
  let { data, error } = res;

  // Apply the content for the body
  if (!data) {
    body = <p>Loading...</p>;
  }

  if (error) {
    if (error?.response?.status == "401") {
      body = (
        <>
          <p>Please login to have access to your history !</p>
        </>
      );
    } else {
      console.log(error);
      body = (
        <>
          <p>
            There has been an issue with the database. Sorry for the
            inconvenience.
          </p>
        </>
      );
    }
  }

  if (data) {
    // Get items from the list
    let arrItems = data.items;
    const [arr, uniqueCategories] = getUniqueKeys(arrItems, "category");

    // Get timestamp
    let timestamp = new Date(data.timestamp);
    let date =
      new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(timestamp) +
      " " +
      (timestamp.getDay() + 1) +
      "." +
      (timestamp.getMonth() + 1) +
      "." +
      (timestamp.getFullYear() + 1);

    let body = (
      <>
        <p className="timestamp">
          <EventNoteIcon />
          {date}
        </p>

        <OpenListButton data={data} />

        <div className="item-list">
          {uniqueCategories.map((category, key) => (
            <div className="item-row" key={key}>
              <h2>{category}</h2>

              {arr
                .filter((item) => item.category == category)
                .map((item, key2) => (
                  <ItemCard
                    key={key2}
                    item={item}
                    rightComponent={
                      <span className="text-main-color">{item.amount} pcs</span>
                    }
                  />
                ))}
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Layout
        title={data?.name || "Shopping List"}
        rightPanel={<CurrentShoppingList title={data?.title} />}
      >
        <h1>{data?.name || "Shopping List"}</h1>

        {body}
      </Layout>
    </>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  // Pass data to the page via props
  return { props: { slug: context.query.slug } };
}

export default ListPage;
