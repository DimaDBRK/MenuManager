import { useContext, useEffect, useState }  from "react";
import { AppContext } from "App";
import { Alert, Grid, Link ,Avatar, TextField, Box, MenuItem, InputLabel, Select, FormControl, FormControlLabel, Checkbox, Button, Typography, useTheme, FormHelperText } from "@mui/material";
import Header from "components/Header";
import ItemsGrid from 'components/ItemsGrid';
// import UsersGrid from "components/UsersGrid";
// import Auth from "auth/Auth";
import Container from '@mui/material/Container';
import jwt_token from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import axios from "axios";

const Manager = (props) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  // categories
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  // organization
  const [org, setOrganization] = useState("");
  const [orgList, setOrgList] = useState([]);
  
  const [msg, setMsg] = useState("");
   
  const { isLogin, setIsLogin, userinfo, setUserInfo, token, setToken } = useContext(AppContext);
    
  const [id, setId] = useState(null);
  const [usersData, setUsersData] = useState([]);
  
 
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleteButton, setIsDeleteButton] = useState(true);
  const [isAddNewButton, setIsAddNewButton] = useState(true);
  //web page title for browser
  const title = props.title;
  useEffect(() => {
    document.title = title;
  },[]);
  
  //theme
  const theme = useTheme();

  const navigate = useNavigate();
  
  // get Categories and Menu list
  useEffect(()=>{
    getCategories();
    getItems();
  }, [])

  // requests
  const getCategories = async () =>{
    // set the Authorization header - token
    try {
      const headers = {
        "x-access-token": `${token}`,
      };
      const res = await axios.get(`/api/menu/categories/all`, { headers });
      console.log('res=>',res.data.categories);
      setCategories(res.data.categories);
      // setMsg(res.data.msg);
      // setToken(res.data.access_token);
    
    } catch (err) {
      const errMsg = err.response.data.msg || err.response.statusText || "An error occurred";
      setMsg(errMsg);
    }
  };  
  
  const getItems = async () =>{
    // set the Authorization header - token
    try {
      const headers = {
        "x-access-token": `${token}`,
      };
      const res = await axios.get(`api/menu/items/all`, { headers });
      console.log('res=>',res.data.items);
      setItems(res.data.items);
      // setMsg(res.data.msg);
      // setToken(res.data.access_token);
    
    } catch (err) {
      const errMsg = err.response.data.msg || err.response.statusText || "An error occurred";
      setMsg(errMsg);
    }
  };  

  

  // select category
    const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    setConfirmDelete(false);
    checkDeleteButton(false);
    setSelectedCategoryName(findCategoryTitleById(categories, event.target.value));
  };

  const  findCategoryTitleById = (array, id) => {
    if (id) {
      const item = array.find(item => item.id === id);
      return item ? item.title : null;
    }
    return "";
   };

     


    // change new category name
    const handleChangeNewCategory = (event) => {
      const newName = (event.target.value).trimStart();
      setMsg("");
      setNewCategory(newName);
      if (newName != "" && newName.trim().length < 80) {
        setIsAddNewButton(false)
      } else {
        setIsAddNewButton(true)
        setMsg("Wrong or empty new organization name!");
      }
    }

    // update 
    const handleChangeUpdateCategory = (event) => {
      setSelectedCategoryName(event.target.value)
    }

    // 

    // open category management
    const openOrganizationManagement = () => {
      setIsDeleteAlert(true);
      setMsg("");
    }

    // delete button
    const checkDeleteButton = (res) => {
      // setIsDeleteButton(true);
      console.log(res);
      if (res && org != "") {
        setIsDeleteButton(false);
      } else {
        setIsDeleteButton(true);
      }
    }

    // requests
    //  add new category
    const handleClickAddNew = async (event) => {
      event.preventDefault();
      console.log("Button new=>", newCategory.trim());
      try {
        const res = await axios.post(`/api/menu/categories/create`, { "title": newCategory.trim() });
        if (res.status === 200 || res.status === 201) {
          console.log(res.data);
          setMsg(res.data.msg);
          // update organizations list
          setCategories(res.data.categories);
          setNewCategory("");
        }
      } catch (err) {
        console.log(err);
        setMsg(err.response.data.msg); // to show in the same part
      }
    }

    // update category
    const handleClickUpdateSelectedCategory = async (id) => {
      if (id) {
        try {
          const res = await axios.put(`/api/menu/categories/update/${id}`, { "title": selectedCategoryName.trim() });
          if (res.status === 200 || res.status === 201) {
            console.log(res.data);
            setMsg(res.data.msg);
            // update list
            setCategories(res.data.categories);
            setNewCategory("");
          }
        } catch (err) {
          console.log(err);
          setMsg(err.response.data.msg); // to show in the same part
        }
      }
    }
    // Delete category
    const handleClickDeleteCategory = async (id) => {
      if (id) {
        try {
          const res = await axios.delete(`/api/menu/categories/delete/${id}`);
          if (res.status === 200 || res.status === 201) {
            console.log(res.data);
            setMsg(res.data.msg);
            // update list
            setCategories(res.data.categories);
            setSelectedCategoryName("");
            setNewCategory("");
          }
        } catch (err) {
          console.log(err);
          setMsg(err.response.data.msg); // to show in the same part
        }
      }
    }

    return(
      <Box m="1.5rem 2.5rem">
        <Header title="MENU MANAGEMENT" subtitle="Edit Categories and Items" />
        { msg != "" && <Alert severity="warning">{msg}</Alert>}
          <Typography variant="h7">
            Functions:
            <ul>
              <li>Add and modify Items, add images.</li>
              <li>View the list of Items in the Category.</li>
              <li>Create a new Category with a unique name.</li>
            </ul>
          </Typography>
              
          <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            alignContent="center"
            gap={1}
            >
            <FormControl sx={{ minWidth: 450 }}>
              <InputLabel id="select-category">Category</InputLabel>
              <Select
                size="small"
                labelId="select-category"
                value={category}
                label="Category"
                onChange={(e) => {handleChangeCategory(e); setMsg("")}}  //getUsersByOrg(e.target.value)
              >
                <MenuItem value=""><em>None</em></MenuItem>
                { categories.length > 0 && (categories.map(item => {
                  return (
                    <MenuItem key ={item.id} value={item.id}>{item.title}</MenuItem>
                  );
                  })
                )}
              </Select>
            </FormControl>
            { !isDeleteAlert && (
            <Button
              
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={ () => openOrganizationManagement() }
            >
              Edit
            </Button>
            )}
          </Box>
    
          {/* Manage category */}

  
          {/* Edit */}
           { isDeleteAlert && (
          
            <Box>

              <Typography variant="h6">
                Edit category 
                <Button
                  // fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1, mb: 1, mx: 3}}
                  onClick={()=>{setConfirmDelete(false); setIsDeleteAlert(false); setMsg(""); setNewCategory("");}}
                >
                  Close
                </Button>
              </Typography>
              {/* update category */}
              <TextField
                sx={{ minWidth: 450 }}
                // fullWidth
                size="small"
                id="upd-cat"
                label="Update Category"
                name="upd-cat"
                value={selectedCategoryName}
                onChange ={(event) => { handleChangeUpdateCategory(event); }} 
                onBlur={()=>{setMsg("")}}
              />
        
              <Button
                
                variant="contained"
                sx={{ ml: 1 }}
                disabled={selectedCategoryName?.length === 0}
                onClick={()=>{handleClickUpdateSelectedCategory(category)}}
              >
                Update
              </Button>
              {/* end update category */}
            </Box>
      
          )}
          { isDeleteAlert && (
            <Box
              sx={{ mt: 1 }}
            >
              <Button
                variant="contained"
                color="error"
                disabled={!category}
                onClick={()=>{handleClickDeleteCategory(category)}}
              >
                Delete
              </Button>

            </Box>
          )}
          {/* New */}
         
          { isDeleteAlert && (
          
            <Box
            sx={{ mt: 1 }}
            >
              {/* new category */}
              <TextField
                sx={{ minWidth: 450 }}
                // fullWidth
                size="small"
                id="new-cat"
                label="New Category"
                name="new-cat"
                value={newCategory}
                onChange ={(event) => { handleChangeNewCategory(event); }} 
                onBlur={()=>{setMsg("")}}
              />
        
              <Button
                
                variant="contained"
                sx={{ ml: 1 }}
                disabled={isAddNewButton}
                onClick={handleClickAddNew}
              >
                Add
              </Button>
              {/* end new category */}
            </Box>
      
          )}

         
        {/* Items */}
        <Box sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: 400,
          px: 2,
          py: 1,
          width: '100%'}}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <MenuBookOutlinedIcon />
          </Avatar>
        </Box>

        {/* Items table */}
        <ItemsGrid category={category} setMsg={setMsg} categories={categories} items={items} setItems={setItems} />
      </Box>
    )
}

export default Manager;