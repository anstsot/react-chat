import React from 'react';
import { withStyles } from 'material-ui/styles';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatJoin from './ChatJoin';

const styles = theme => ({
  contentChat: {
    backgroundColor: '#d6e9f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    minHeight: 'calc(100vh - 184px)',
    overflow: 'hidden',
    marginLeft: '320px',
    paddingBottom: '120px',
  },
});

const Chat = ({ classes, messages, user, joinChatClick }) => {
  return (
    <main className={classes.contentChat}>
      <MessageList messages={messages} userId={user._id}/>
      { user.isChatMember ? <MessageInput /> : <ChatJoin joinChatClick={joinChatClick} /> }
    </main>
  );
}

export default withStyles(styles)(Chat);
