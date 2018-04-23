import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from './Avatar';
import dateFormat from '../utils/date-format';

const styles = () => ({
  activeChat: {
    background: '#d6e9f7',
  },
});

const ChatListItem = ({
  classes, _id, title, updatedAt, activeChat, disabled,
}) => (
  <ListItem
    disabled={disabled}
    button
    component={Link}
    to={`/chat/${_id}`}
    className={activeChat === _id && classes.activeChat}
  >
    <Avatar colorFrom={title}>{title}</Avatar>
    <ListItemText primary={title} secondary={dateFormat(updatedAt)} />
  </ListItem>
);

ChatListItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
  _id: PropTypes.string.isRequired,
  activeChat: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChatListItem);
