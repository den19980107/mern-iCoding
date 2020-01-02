import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import _ from "lodash";
import UserProvider from '../context/UserProvider';

//component
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
   },
}));
const MenuBar = () => {
   const user = useContext(UserProvider.context);
   const isLogin = !_.isEmpty(user) ? true : false;
   const classes = useStyles();


   return (
      <AppBar position="static" >
         <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
               <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
               News
          </Typography>
            {
               !isLogin &&
               <React.Fragment>
                  <Link to="/login">
                     <Button style={{ color: "white" }}>
                        登入
                     </Button>
                  </Link>
                  <Link to="/register">
                     <Button style={{ color: "white" }}>
                        註冊
                     </Button>
                  </Link>
               </React.Fragment>
            }
            {
               isLogin &&
               <React.Fragment>
                  <span>{user.username}</span>
                  <Button color="secondary">
                     <a href="http://localhost:5000/auth/logout" style={{ textDecoration: 'none', color: "white" }}>登出</a>
                  </Button>
               </React.Fragment>
            }
         </Toolbar>

      </AppBar >
   );
};

export default MenuBar;