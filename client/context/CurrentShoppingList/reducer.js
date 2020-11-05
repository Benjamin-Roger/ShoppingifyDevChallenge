
// Reducer to update the amount of the items in the current shopping list as well as the list status
export function reducer(state, action) {

    var items_array = [...state.items];

    switch (action.type) {

        case 'ADD_ITEM':

            var addIndex = items_array.map((item) => item.name).indexOf(action.item.name);

            if (addIndex > -1) {
                // if the item already exists, then only the amount is updated
                // get index of object with the name of the new item

                items_array[addIndex].amount++;

                return {...state,
                    items: items_array
                }
            } else {
                //if the item is not in the list yet, it is added to the array

                // the completed status of the item is false by default
                var newItem = action.item;
                newItem.completed = false;

                return {...state,
                    items: [newItem].concat(items_array)
                };
            }

        case 'REMOVE_ITEM':

            // get index of object with the name of the new item
            var removeIndex = items_array.map((item) => item.name).indexOf(action.item.name);

            if (items_array[removeIndex].amount > 1) {

                items_array[removeIndex].amount--;

                return {...state,
                    items: [...items_array]
                }
            } else {
                //if the item only has 1 piece left, it is removed from the array

                items_array.splice(removeIndex, 1);

                return {...state,
                    items: [...items_array]
                };
            }

        case 'DELETE_ITEM':

            // get index of object with the name of the new item
            var deleteIndex = items_array.map((item) => item.name).indexOf(action.item.name);

            //delete the item from the array

            items_array.splice(removeIndex, 1);

            return { ...state,
                items: [...items_array]
            };

        case 'COMPLETE_ITEM':

            // get index of object with the name of the new item
            var completeIndex = items_array.map((item) => item.name).indexOf(action.item.name);

            //delete the item from the array

            items_array[completeIndex].completed = !items_array[completeIndex].completed

            return { ...state, 
                items: [...items_array]
            };

        case 'CANCEL_LIST':

            // empty the list

            return {
                items: []
            };

        case 'UPDATE_LIST':

            // replace the content of the shopping list with the current payload 

            return { ...state, ...action.payload };

        case 'OPEN_LIST':

            // replace the content of the shopping list with the current payload 

            return { ...state, ...action.payload };


        default:
            throw new Error();
    }
}


