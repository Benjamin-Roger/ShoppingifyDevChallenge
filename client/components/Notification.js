import React, { useContext } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { NotificationContext, NotificationDispatch } from '@/context/Notification/context'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const PopUp = (props) => {

    const notificationState = useContext(NotificationContext);
    const notificationDispatch = useContext(NotificationDispatch);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        notificationDispatch({
            type: 'CLOSE'
        });

    };

    return (
        <>

            <Snackbar
                open={notificationState.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={notificationState.severity}>
                    {notificationState.content}
                </Alert>
            </Snackbar>
        </>
    );


}