import React from 'react';
import { withStyles } from 'material-ui/styles';
import Message from './Message';

const styles = theme => ({
  MessageList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
});

const MessageList = ({ classes, messages }) => {
  return (
    <div className={classes.MessageList}>
      { messages && messages.map((message, key) => 
        <Message key={key} {...message} />
      )}
    </div>
  );
}

export default withStyles(styles)(MessageList);
