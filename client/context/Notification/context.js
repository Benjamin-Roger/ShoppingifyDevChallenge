import { useReducer, useContext, createContext } from 'react';

import reducer from './reducer'

export const NotificationContext = createContext();
export const NotificationDispatch = createContext();

const initialState = {
    open: false,
    severity: '',
    content: ''
};

export const NotificationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <NotificationDispatch.Provider value={dispatch}>
            <NotificationContext.Provider value={state}>
                {children}
            </NotificationContext.Provider>
        </NotificationDispatch.Provider>
    )
}

export const useNotificationContext = () => useContext(NotificationContext);
export const useNotificationDispatch = () => useContext(NotificationDispatch);
