import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from './Avatar';
import dateFormat from '../utils/date-format';

const styles = theme => ({
  activeChat: {
    background: '#d6e9f7',
  }
});

const ChatListItem = ({ classes, _id, title, updatedAt, activeChat }) => {
  return (
    <ListItem button component={Link} to={ `/chat/${_id}` } className={activeChat===_id && classes.activeChat}>
      <Avatar colorFrom={title}>{title}</Avatar>
      <ListItemText primary={title} secondary={dateFormat(updatedAt)} />
    </ListItem>
  );
}

export default withStyles(styles)(ChatListItem);

