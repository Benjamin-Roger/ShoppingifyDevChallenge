
import PropTypes from "prop-types"
import React from "react"

import {useSidePanelDispatch} from '@/components/ContextComponents/SidePanelContext';
import ItemDetail from '@/components/ItemDetail';



const ItemCard = ({item, rightComponent}) => {

    const sidePanelDispatch = useSidePanelDispatch();

    const toggleItemDetailPanel = (item) =>
        sidePanelDispatch({
            type: 'TOGGLE_SIDE_PANEL',
            content: <ItemDetail item={item} />
        });


    return (
        < div className="itemcard card" >
            <p  onClick={() => toggleItemDetailPanel(item) }>{item.name}</p>
            { rightComponent}
        </div >
    )
};


ItemCard.propTypes = {
    name: PropTypes.string,
}

ItemCard.defaultProps = {
    name: ``,
}

export default ItemCard;