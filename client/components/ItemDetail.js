

import { useSidePanelDispatch } from './ContextComponents/SidePanelContext';
import { ListDispatch } from '../components/ContextComponents/CurrentShoppingList/context.js'
import { useContext } from 'react';

import Button from '@material-ui/core/Button';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Link from 'next/link';



const ItemDetail = ({ item }) => {

  const sidePanelDispatch = useSidePanelDispatch();
  const listDispatch = useContext(ListDispatch);

  const addAndClose = (event) => {
    sidePanelDispatch({
      type: 'TOGGLE_SIDE_PANEL'
    });

    listDispatch({
      type: 'ADD_ITEM',
      item: { ...item, amount: 1 }
    });
  }

  const closePanel = (event) => {
    sidePanelDispatch({
      type: 'TOGGLE_SIDE_PANEL',
      content: ''
    });

  }

  return (

    <>
      <div className="item-detail">
        <span onClick={() => closePanel()} className="back-arrow"><KeyboardBackspaceIcon />Go back</span>
        <figure>
          <img title={item.name} src={item.image} />
        </figure>
        <h3>name</h3>
        <p>{item.name}</p>
        <h3>note</h3>
        <p>{item.note}</p>
        <h3>category</h3>
        <p>{item.category}</p>

        <Button className="btn-dark" variant="contained" size="large" color="primary" onClick={() => addAndClose(item)}>
          Add to the list
        </Button>
      </div>

    </>

  )
}

export default ItemDetail;