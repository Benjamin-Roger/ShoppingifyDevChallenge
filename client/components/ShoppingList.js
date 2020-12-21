import React, { useState } from "react";

import SidePanelButton from "@/context/SidePanelContext";

import CreateIcon from "@material-ui/icons/Create";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";

import Checkbox from "@material-ui/core/Checkbox";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";

import { useContext, useEffect } from "react";
import { ListDispatch } from "@/context/CurrentShoppingList/context";
import { NotificationDispatch } from "@/context/Notification/context";
import { addNewNotification } from "@/context/Notification/utils";

import getUniqueKeys from "@/utils/sortItems";
import AddNewItemForm from "@/components/AddNewItemForm";

import axios from "axios";
import CancelDialog from "./CancelDialog";

import { isAuthenticated } from "@/hooks/isAuthenticated";

const ShoppingListItem = ({ item, editing }) => {
  // The 3 button blocks appear on click of the amount bubble
  const [active, setActive] = React.useState(false);

  const listDispatch = useContext(ListDispatch);

  const addToList = (product) =>
    listDispatch({
      type: "ADD_ITEM",
      item: product,
    });

  const removeFromList = (product) =>
    listDispatch({
      type: "REMOVE_ITEM",
      item: product,
    });

  const deleteFromList = (product) =>
    listDispatch({
      type: "DELETE_ITEM",
      item: product,
    });

  const completeItem = (product) =>
    listDispatch({
      type: "COMPLETE_ITEM",
      item: product,
    });

  return (
    <div
      className="shopping-list__item"
      onMouseLeave={() => setActive((active) => false)}
    >
      {!editing ? (
        <Checkbox
          color="primary"
          size="small"
          style={{ width: "35px" }}
          checked={item.completed}
          onClick={() => completeItem(item)}
        />
      ) : (
        ""
      )}
      <p
        style={{ textDecoration: item.completed ? "line-through" : "initial" }}
      >
        {item.name}
      </p>
      {!active ? (
        <Button
          onClick={() => setActive((active) => !active)}
          variant="outlined"
          color="primary"
        >
          {item.amount}
        </Button>
      ) : (
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={() => deleteFromList(item)}>
            <DeleteIcon />
          </Button>
          <Button onClick={() => removeFromList(item)}>
            <RemoveIcon />
          </Button>
          <Button>{item.amount}</Button>
          <Button onClick={() => addToList(item)}>
            <AddIcon />
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

const ShoppingListContainer = ({ editing, items }) => {
  const [arr, uniqueCategories] = getUniqueKeys(items, "category");

  return (
    <>
      {uniqueCategories.map((category, key) => (
        <div key={key}>
          <h3>{category}</h3>

          {arr
            .filter((item) => item.category == category)
            .map((item, key2) => (
              <ShoppingListItem key={key2} {...{ editing }} {...{ item }} />
            ))}
        </div>
      ))}
    </>
  );
};

const EmptyShoppingList = () => (
  <div className="empty-shopping-list">
    <strong>No items at the moment</strong>

    <img src="/images/shopping.svg" />
  </div>
);

const ShoppingList = ({ listContext }) => {
  var items = listContext.items;

  const emptyList = items.length ? false : true;

  // Get dispatch contexts

  const listDispatch = useContext(ListDispatch);
  const notificationDispatch = useContext(NotificationDispatch);

  // Initiate different states
  const [name, setName] = React.useState(listContext.name || "");
  const [completed, toggleComplete] = React.useState(false);
  const [editing, toggleEditing] = React.useState(true);
  const [_id, setId] = React.useState(listContext._id || "");

  useEffect(() => {
    if (listContext.name) {
      setName(name || listContext.name);
      setId(_id || listContext._id);
    }
  });

  const saveList = (status) => {
    const newList = {
      name: name,
      items: [...items],
      timestamp: new Date(),
      user: "",
      status: status,
      _id: _id,
    };

    if (_id) {
      // If there exists an ID, then it is an update
      axios
        .put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/lists`, newList, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((res) => {
          addNewNotification(
            {
              content: res.data.message,
              severity: newList.status === "completed" ? "info" : "success",
            },
            notificationDispatch
          );

          // The list status is updated to completed or completing if success
          toggleComplete(status === "completed");
          toggleEditing(false);
        })
        .catch((err) => {
          console.log("error in request -", err);

          addNewNotification(
            {
              content: `The list has not been saved, try another title.`,
              severity: "error",
            },
            notificationDispatch
          );
        });
    } else {
      // Otherwise, we create a new list
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/lists`, newList, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((res) => {
          addNewNotification(
            {
              content: res.data.message,
              severity: "success",
            },
            notificationDispatch
          );

          setId(res.data._id);

          // The list status is updated to completed or completing if success
          toggleComplete(status === "completed");
          toggleEditing(false);
        })
        .catch((err) => {
          console.log("error in request -", err);

          addNewNotification(
            {
              content: `The list has not been saved properly, try another title.`,
              severity: "error",
            },
            notificationDispatch
          );
        });
    }
  };

  const cancelList = () => {
    // Empty current context

    listDispatch({
      type: "CANCEL_LIST",
    });

    // Reinitialize state
    toggleEditing(true);
    toggleComplete(false);
    setName("");
    setId("");

    if (_id) {
      axios
        .put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/lists/update`, {
          _id: _id,
          status: "canceled",
        })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log("error in request -", err);
        });
    }

    addNewNotification(
      {
        content: `The list has been canceled.`,
        severity: "success",
      },
      notificationDispatch
    );
  };

  const saveButton = (
    <Button
      variant="contained"
      size="large"
      color="primary"
      className="btn-dark"
      disabled={emptyList || !name || completed}
      onClick={() => saveList("completing")}
    >
      Save
    </Button>
  );

  //
  const cancelButton = (
    <CancelDialog
      title="Are you sure you want to cancel that list ?"
      buttonText="Cancel"
      disabled={emptyList ?? !name}
      callback={() => cancelList()}
    />
  );

  //
  const completeButton = (
    <Button
      variant="contained"
      size="large"
      color="secondary"
      className="btn-dark"
      onClick={() => saveList("completed")}
      disabled={emptyList || !name || completed}
    >
      Complete
    </Button>
  );

  const isUserAuthenticated = isAuthenticated();

  const loginButton = (
    <Button
      variant="contained"
      size="large"
      color="primary"
      className="btn-dark"
      onClick={() => {
        addNewNotification(
          {
            content: `You need to log in to save a list.`,
            severity: "info",
          },
          notificationDispatch
        );
      }}
    >
      Save
    </Button>
  );

  return (
    <div className="shopping-list">
      <div className="container">
        <div className="add-item-cta">
          <img src="/images/bottle.svg" />
          <p>Didn't find what you need&nbsp;?</p>
          <SidePanelButton content={<AddNewItemForm />} className="add-item">
            Add item
          </SidePanelButton>
        </div>

        <div style={{ display: "flex", width: "100%" }}>
          <FormControl>
            <TextField
              id="shopping-list-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              inputProps={{
                "aria-label": "shopping list name",
              }}
              placeholder="Shopping list"
              required
            />
          </FormControl>

          <IconButton
            style={{ marginLeft: "5px" }}
            onClick={() => toggleEditing(!editing)}
          >
            <CreateIcon />
          </IconButton>
        </div>

        {emptyList ? (
          <EmptyShoppingList />
        ) : (
          <ShoppingListContainer {...{ editing }} {...{ items }} />
        )}
      </div>

      <div className="save-list">
        {cancelButton}

        <hr />

        {isUserAuthenticated
          ? editing
            ? saveButton
            : completeButton
          : loginButton}
      </div>
    </div>
  );
};

export default ShoppingList;
