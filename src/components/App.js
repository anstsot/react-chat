import React from 'react';
import 'typeface-roboto';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import { withStyles } from 'material-ui/styles';
import { chats, messages } from '../mock-data';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

const App = ({classes}) => {
  return (
    <div className={classes.root}>
      <ChatHeader />
      <Sidebar chats={chats} />
      <Chat messages={messages} />
    </div>
  );
};

export default withStyles(styles)(App);
