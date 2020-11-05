import { useReducer, useContext, createContext } from 'react'

import Button from '@material-ui/core/Button';
import AddNewItemForm from '@/components/AddNewItemForm';


export const SidePanelContext = createContext()
export const SidePanelDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDE_PANEL':
      return {
        active:!state.active,
        content:action.content || state.content
      };

    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const SidePanelContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    active: false,
    content: <AddNewItemForm />
  })

  
  return (
    <SidePanelDispatchContext.Provider value={dispatch}>
      <SidePanelContext.Provider value={state}>
        {children}
      </SidePanelContext.Provider>
    </SidePanelDispatchContext.Provider>
  )
}

const SidePanelButton = (props) => {

  const sidePanelDispatch = useSidePanelDispatch();

  const toggleSidePanel = (event) =>
    sidePanelDispatch({
      type: 'TOGGLE_SIDE_PANEL',
      content: props.content
    });

  const default_text = "Open side panel";

  return (
    <Button
      variant="contained"
      className={props.className}
      onClick={toggleSidePanel}
    >
      {props.children ? props.children : default_text}
    </Button>
  )

}



export const useSidePanelContext = () => useContext(SidePanelContext)
export const useSidePanelDispatch = () => useContext(SidePanelDispatchContext)

export default SidePanelButton;

