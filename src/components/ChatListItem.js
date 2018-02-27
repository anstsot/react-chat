import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  
});

const ChatListItem = ({ chat, key }) => {
  return (
    <ListItem button component="a" key={ key }>
      <Avatar>{ chat.title[0] }</Avatar>
      <ListItemText primary={ chat.title } />
    </ListItem>
  );
}

export default withStyles(styles)(ChatListItem);

