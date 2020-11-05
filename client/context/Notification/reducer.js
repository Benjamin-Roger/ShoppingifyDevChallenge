export default function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE':
            return {
                ...state,
                open: action.notification.open,
                severity: action.notification.severity,
                content: action.notification.content
            };

            case 'CLOSE':
            return {
                ...state,
                open:false
            };


        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
}

