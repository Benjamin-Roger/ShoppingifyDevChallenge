export function addNewNotification(notification, notificationDispatch) {
    
    notificationDispatch({
        type: 'UPDATE',
        notification: {
            open: true,
            severity: notification.severity,
            content: notification.content
        }
    });
    
}