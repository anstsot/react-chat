import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import ChatListItem from './ChatListItem';

const styles = theme => ({
  ChatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
});

const ChatList = ({ classes, chats }) => {
  return (
    <List className={ classes.ChatsList }>
      { chats && chats.map((chat, key) => 
        <ChatListItem key={ key } { ...chat } />
      )}
    </List>
  );
}

export default withStyles(styles)(ChatList);