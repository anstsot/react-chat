import React from 'react';
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import ChatUserMenu from './ChatUserMenu';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - 320px)`,
  },
  appTypography: {
    flex: 1,
  },
})

class ChatHeader extends React.Component {
  render() {
   const { classes, logout } = this.props;

   return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.appTypography} variant="title" color="inherit" noWrap>
          First React Chat
        </Typography>
        <ChatUserMenu 
          onLogoutClick={logout}
        />
      </Toolbar>
    </AppBar>
    );
  }
}

export default withStyles(styles)(ChatHeader);
