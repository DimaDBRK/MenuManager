import { useContext, useEffect, useState }  from "react";
import { AppContext } from "App";
import 
{ Alert,
  Box, 
  Typography, 
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails 
} from "@mui/material";
import Header from "components/Header";
import ItemCard from "components/Card";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from "axios";

const Menu = (props) => {
  
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");
   
  const { token, setToken } = useContext(AppContext);
    
  
    //web page title for browser
    const title = props.title;
    useEffect(() => {
      document.title = title;
    },[]);
   
    //theme
    const theme = useTheme();
  
       
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

    return(
        <Box 
          m="1.5rem 2.5rem"
           >
            <Header title="MENU" subtitle="order your favorite meals " />
            { msg != "" && <Alert severity="warning">{msg}</Alert>}
            <Box>
              <div className="menu">
                {categories.map(category => (
                  <Accordion key={category.id}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${category.id}-panel-content`}
                      id={`${category.id}-panel-header`}
                    >
                      <Typography
                        variant="h6"
                      >
                        {category.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        display="flex"
                        flexDirection="row" 
                        flexWrap="wrap"
                        justifyContent="flex-start"
                        alignItems="center" 
                        gap={1}
                      >
                        {items.filter(item => item.categoryId === category.id).map(filteredItem => (
                        
                            < ItemCard key = {filteredItem.id} item = {filteredItem} />

                        ))}
                      </Box>
                    </AccordionDetails>  
                  </Accordion>
                ))}
              </div>

            </Box>
          </Box>
    )
}

export default Menu;