import React from 'react';
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import ChatUserMenu from './ChatUserMenu';
import Avatar from './Avatar';
import ChatMoreMenu from './ChatMoreMenu';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - 320px)`,
  },
  appTypography: {
    flex: 1,
    marginLeft: theme.spacing.unit,
  },
})

class ChatHeader extends React.Component {
  render() {
   const { classes, logout, chatName, user, leaveChatClick, deleteChatClick, editProfile, isConnected } = this.props;
   const title = chatName ? chatName : 'First React Chat';

   return (
    <AppBar className={classes.appBar}>
      <Toolbar>
          {chatName ? <Avatar colorFrom={title}>{title}</Avatar> : null}
        <Typography className={classes.appTypography} variant="title" color="inherit" noWrap>
          {title}
          {user.isChatMember ? 
            <ChatMoreMenu 
              disabled={!isConnected} 
              user={user} 
              leaveChatClick={leaveChatClick} 
              deleteChatClick={deleteChatClick} 
            /> 
            : null}
        </Typography>
        <ChatUserMenu
          disabled={!isConnected} 
          onLogoutClick={logout} 
          user={user} 
          editProfile={editProfile} 
        />
      </Toolbar>
    </AppBar>
    );
  }
}

export default withStyles(styles)(ChatHeader);
