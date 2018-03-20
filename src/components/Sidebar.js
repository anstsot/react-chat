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

class Sidebar extends React.Component{
  state = {
    activeChats: 0,
    search: '',
  };

  handleChatsChange = (event, activeChats) => {
    this.setState({ activeChats });
  }

  handleSearchChange = event => {
    this.setState({
      search: event.target.value,
    });
  }

  filterChats = (chats) => {
    const { search } = this.state;

    return chats.filter(chat => 
      chat.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  render() {
    const { classes, chats, activeChat, addNewChat, isConnected } = this.props;
    const { activeChats } = this.state;

    return (
      <Drawer variant="permanent" classes={{ paper: classes.drawerPaper}}>
        <div className={classes.drawerHeader}>
          <TextField 
            fullWidth 
            placeholder="Search chats..." 
            margin="normal" 
            value={this.state.searchs}
            onChange={this.handleSearchChange}/>
        </div>
        <Divider />
        <ChatList disabled={!isConnected} chats={ this.filterChats(activeChats === 0 ? chats.my : chats.all) } activeChat={activeChat}/>
        <NewChatButton disabled={!isConnected} addNewChatClick={addNewChat}/>
        <BottomNavigation showLabels value={activeChats} onChange={this.handleChatsChange}>
          <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
        </BottomNavigation>
      </Drawer>
    )
  }
};

export default withStyles(styles)(Sidebar);
