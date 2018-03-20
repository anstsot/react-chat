import React from 'react';
import { withStyles } from 'material-ui/styles';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatJoin from './ChatJoin';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

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
  }
});

const Chat = ({ classes, messages, user, joinChatClick, activeChat, sendMessage, isConnected }) => {
  
  return (
    <main className={classes.contentChat}>
      { activeChat ? 
        <MessageList messages={messages} userId={user._id}/> 
        : <Paper className={classes.startPaper} elevation={4}>
            <Typography variant="headline" component="h3">Start messaging...</Typography>
            <Typography component="p">Use <b>>Global</b> to explore communities around here.</Typography>
            <Typography component="p">Use <b>>Recents</b> to see your recent conversations.</Typography>
          </Paper> 
      }
      { activeChat ? 
          user.isChatMember ? <MessageInput disabled={!isConnected} sendMessage={(content) => sendMessage(content)} /> 
          : <ChatJoin disabled={!isConnected} joinChatClick={joinChatClick} /> : null }
    </main>
  );
}

export default withStyles(styles)(Chat);
