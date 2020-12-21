import Link from "next/link";
import useSWR from "swr";


import React, { useState } from "react";

import Layout from "@/components/Layout";

import HistoryListItem from "@/components/HistoryListItem";
import { sortByTimeStampKey } from "../utils/sortItems";

import { authFetch } from "@/utils/authFetch";

import { CurrentShoppingList } from "@/context/CurrentShoppingList/context.js";

const HistoryPage = () => {
  // Initialize the body
  var body = "";

  // Get data
  const res = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/lists`,
    authFetch
  );
  var { data, error } = res;

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

      console.log(error)
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
    var sorted_array = sortByTimeStampKey(data, "timestamp").reverse();

    body = (
      <div className="history-list">
        {sorted_array.map((item, key) => (
          <HistoryListItem key={key} item={item} />
        ))}
      </div>
    );
  }

  return (
    <>
      <Layout title="History" rightPanel={<CurrentShoppingList />}>
        <h1>Shopping History</h1>

        {body}
      </Layout>
    </>
  );
};

export default HistoryPage;
