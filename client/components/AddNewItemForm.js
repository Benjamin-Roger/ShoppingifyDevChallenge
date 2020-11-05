import SidePanelButton, { useSidePanelDispatch } from '@/context/SidePanelContext';

import { ListDispatch } from '@/context/CurrentShoppingList/context.js'

import { useContext } from 'react';

import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

import axios from 'axios';

import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

import { addNewNotification } from '@/context/Notification/utils';
import { NotificationDispatch } from 'context/Notification/context';


const AddNewItemFormComponent = ({ initialCategories }) => {

  // Initiate the values from the form
  const [values, setValues] = React.useState({
    name: '',
    note: '',
    image: '',
    category: '',
    categories: []
  });


  // The category input is invisible unless activated
  const [stateCategoryInputVisibility, setCatInputVisibility] = React.useState(false);

  const [newCat, setNewCat] = React.useState({
    name: ''
  });

  // Handle the input changes
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handle specifically the extra category input
  const handleChangeNewCat = (event) => {
    setNewCat({
      name: event.target.value
    });
  }

  // Add the new categories to the multi select
  const addNewCat = () => {

    // Get new array of categories
    var newCategories = values.categories.concat([newCat.name]);


    setValues({
      ...values,
      categories: newCategories, // Add to the extra categories list
      category: newCat.name // Change the category field value to new cat
    })

    // Reset the new category field
    setNewCat({
      name: ''
    })


    // Close the new category field
    setCatInputVisibility(!stateCategoryInputVisibility)

  }

  // Get the dispatch contexts
  const sidePanelDispatch = useSidePanelDispatch();
  const listDispatch = useContext(ListDispatch);
  const notificationDispatch = useContext(NotificationDispatch);

  // If the item has a name and a category, it can be saved
  const saveAndClose = (event) => {

    if (values.name && values.category) {

      sidePanelDispatch({
        type: 'TOGGLE_SIDE_PANEL'
      });

      listDispatch({
        type: 'ADD_ITEM',
        item: { ...values, amount: 1 }
      });

      addNewNotification({
        content: `The item ${values.name} has been added to the list.`,
        severity: 'success'
      },
        notificationDispatch)
    }
  }


  return (

    <>
      <form className="add-new-item-form">
        <h2>Add a new Item</h2>
        <div>
          <TextField
            id="standard-adornment-name"
            value={values.name}
            onChange={handleChange('name')}
            aria-describedby="name-helper-text"
            inputProps={{
              'aria-label': 'name',
            }}
            placeholder="Enter a name"
            variant="outlined"
            label="Name"

            error={!values.name}

            required
          />
        </div>

        <br />

        <div>

          <TextField
            id="standard-note-static"
            multiline
            rows={4}
            onChange={handleChange('note')}
            value={values.note}
            placeholder="Enter a note"
            aria-describedby="note-helper-text"
            variant="outlined"
            label="Note"
          />
        </div>

        <br />

        <div>
          <TextField
            id="standard-adornment-image"
            value={values.image}
            onChange={handleChange('image')}
            aria-describedby="image-helper-text"
            inputProps={{
              'aria-label': 'image source',
            }}
            placeholder="Enter a URL"
            variant="outlined"
            label="Image URL"
          />
        </div>

        <br />

        <div>
          <div style={{ display: "flex" }}>

            <Select
              aria-describedby="category-helper-text"
              id="category-select"
              value={values.category}
              onChange={handleChange('category')}
              placeholder="Enter a category"
              variant="outlined"
              required
              label="Category"
              className="category-select"
            >

              {values?.categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}

              {initialCategories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}

            </Select>


            <IconButton onClick={() => setCatInputVisibility(!stateCategoryInputVisibility)} >
              <AddIcon />
            </IconButton>
          </div>


        </div>

        <div style={{ display: stateCategoryInputVisibility ? "block" : "none" }}>

          <br />

          <FormHelperText id="new-category-helper-text">New Category</FormHelperText>
          <div style={{ display: "flex" }}>
            <TextField
              id="standard-adornment-category"
              aria-describedby="new-category-helper-text"
              inputProps={{
                'aria-label': 'new category name',
              }}
              placeholder="Enter the new category name"
              variant="outlined"
              value={newCat.name}

              onChange={handleChangeNewCat}
            />

            <IconButton onClick={() => addNewCat()} >
              <SaveIcon />
            </IconButton>

          </div>
        </div>

        <div className="button-container form-buttons">
          <SidePanelButton className="btn btn-transparent">Cancel</SidePanelButton>
          <Button className="btn-dark" variant="contained" color="primary" onClick={() => saveAndClose()}>Save</Button>
        </div>
      </form>

    </>

  )
}

// To avoid the state update loop in the function component, the "wrapper" below allows to only fetch the categories once the component did mount, limiting the state updates.

class AddNewItemForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialCategories: []
    }
  }

  componentDidMount() {
    axios.get(`${publicRuntimeConfig.BASE_API_URL}/api/items/categories`)
      .then(res => {

        this.setState({
          initialCategories: res.data
        })

      })
      .catch(err => {
        console.log('error in request', err);
      });
  };

  render() {
    return <AddNewItemFormComponent initialCategories={[...this.state.initialCategories]} />
  }
}


export default AddNewItemForm;