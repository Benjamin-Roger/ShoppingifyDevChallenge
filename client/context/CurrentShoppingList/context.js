import React, { useContext, useReducer } from 'react'

import ShoppingList from '@/components/ShoppingList.js';

import { reducer } from './reducer.js'


export const ListContext = React.createContext();
export const ListDispatch = React.createContext();

const initialState = {
    name: '',
    _id: '',
    userId:'',
    items: [],
    status:'',
    timestamp:''
};

export const ListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <ListDispatch.Provider value={dispatch}>
            <ListContext.Provider value={state}>
                {children}
            </ListContext.Provider>
        </ListDispatch.Provider>
    )
}


export const CurrentShoppingList = () => {

    const listContext = useContext(ListContext);

    return (
        <>
            <ShoppingList listContext={listContext} />
        </>
    );
}

