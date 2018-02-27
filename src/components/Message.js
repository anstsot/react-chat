import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  MessageDiv: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  messageDivFromMe: {
    justifyContent: 'flex-end',
  },
  Message: {
    maxWidth: '70%',
    minWidth: '10%',
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
  },
  messageFromMe: {
    marginRight: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff'
  },
});

const Message = ({ classes, sender, content }) => {
  const isMessageFromMe = sender === 'me';

  const UserAvatar =  (
    <Avatar>{ sender[0] }</Avatar>
  );

  return (
    <div className={ classnames(classes.MessageDiv, isMessageFromMe && classes.messageDivFromMe) }>
      {!isMessageFromMe && UserAvatar}
      <Paper className={ classnames(classes.Message, isMessageFromMe && classes.messageFromMe) }>
        <Typography variant="caption">
          {sender}
        </Typography>
        <Typography variant="body1">
          {content}
        </Typography>
      </Paper>
      {isMessageFromMe && UserAvatar}
    </div>
  )
}

export default withStyles(styles)(Message);
