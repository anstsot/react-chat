/* eslint no-nested-ternary: 0 */
/* eslint react/jsx-indent: 0 */
/* eslint no-trailing-spaces: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import MessageList from './MessageList';
import ChatJoin from './ChatJoin';
import MessageInput from './MessageInput';

const styles = theme => ({
  contentChat: {
    backgroundColor: '#d6e9f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    minHeight: 'calc(100vh - 64px)',
    overflow: 'hidden',
    marginLeft: '320px',
  },
  startPaper: {
    padding: theme.spacing.unit * 3,
    height: '100px',
  },
});

const Chat = ({
  classes, messages, user, joinChatClick, activeChat, sendMessage, isConnected, 
}) => (
  <main className={classes.contentChat}>
    {activeChat ? (
      // eslint-disable-next-line
      <MessageList messages={messages} userId={user._id} />
    ) : (
      <Paper className={classes.startPaper} elevation={4}>
        <Typography variant="headline" component="h3">
          Start messaging...
        </Typography>
        <Typography component="p">
          Use <b>Global</b> to explore communities around here.
        </Typography>
        <Typography component="p">
          Use <b>Recents</b> to see your recent conversations.
        </Typography>
      </Paper>
    )}
    {activeChat ? (
      user.isChatMember ? (
        <MessageInput disabled={!isConnected} sendMessage={content => sendMessage(content)} />
      ) : (
        <ChatJoin disabled={!isConnected} joinChatClick={joinChatClick} />
      )
    ) : null}
  </main>
);

Chat.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    chatId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    sender: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
  joinChatClick: PropTypes.func.isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  sendMessage: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

Chat.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(Chat);
