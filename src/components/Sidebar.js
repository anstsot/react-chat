import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ChatList from './ChatList';

import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';
import NewChatButton from './NewChatButton';

const styles = theme => ({
  drawerPaper: {
    position: 'fixed',
    height: '100%',
    width: 320,
  },
  drawerHeader: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    ...theme.mixins.toolbar,
  },
});

const Sidebar = ({ classes, chats, activeChat }) => {
  return (
    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper,}}>
      <div className={classes.drawerHeader}>
        <TextField fullWidth placeholder="Search chats..." margin="normal"/>
      </div>
      <Divider />
      <ChatList chats={ chats } activeChat={activeChat}/>
      <NewChatButton />
      <BottomNavigation showLabels>
        <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
      </BottomNavigation>
    </Drawer>
  )
};

export default withStyles(styles)(Sidebar);
