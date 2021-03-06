/* eslint react/no-array-index-key: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import ChatListItem from './ChatListItem';

const styles = () => ({
  ChatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
});

const ChatList = ({
  classes, chats, activeChat, disabled,
}) => (
  <List className={classes.ChatsList}>
    {chats &&
      chats.map((chat, key) => (
        <ChatListItem disabled={disabled} key={key} activeChat={activeChat} {...chat} />
      ))}
  </List>
);

ChatList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  chats: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  disabled: PropTypes.bool.isRequired,
};

ChatList.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(ChatList);
