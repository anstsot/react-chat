import React from 'react';
import { withStyles } from 'material-ui/styles';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const styles = theme => ({
  contentChat: {
    backgroundColor: '#d6e9f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    overflow: 'hidden',
    marginLeft: '320px',
    paddingBottom: '120px',
  },
});

const Chat = ({ classes, messages }) => {
  return (
    <main className={classes.contentChat}>
      <MessageList messages={messages} />
      <MessageInput />
    </main>
  );
}

export default withStyles(styles)(Chat);
