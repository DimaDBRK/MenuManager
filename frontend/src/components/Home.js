
import {useContext, useEffect} from 'react';
//MUI
import DashboardIcon from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router-dom";
import { AppContext } from "../App";


const Home = (props) => {
    const { isLogin, setIsLogin } = useContext(AppContext);
    
    //web page title for browser
    const title = props.title;
    useEffect(() => {
        document.title = title;
    },[]);
    
    return(
        <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
            <Container maxWidth="md">
                <Typography
                component="h1"
                variant="h2"
                align="center"
                gutterBottom
                >
                    Welcome to Menu Manger!   
                </Typography>
                <Typography variant="h5" align="center"  paragraph>
                Explore restaurant menus and effortlessly manage items with our user-friendly web app.
                </Typography>
                <Stack
                    sx={{ pb: 1 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    {!isLogin && (     
                        <Button variant="contained" color="primary" size="large" endIcon={<LoginIcon />} component={Link} to='/menu'>Menu</Button>
                        )
                    }
                    </Stack>
            </Container>
            <Container maxWidth="md">
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    To edit menu Login or Register.
                </Typography>
                {!isLogin && (   
                <Stack
                    sx={{ pb: 1 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="outlined"  size="large" endIcon={<LoginIcon />} component={Link} to='/register'>Register</Button>
                </Stack>
                )}
            </Container>
        </Box>
          
        </main>
    )
}

export default Home;