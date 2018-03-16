import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Avatar from './Avatar';
import getColor from '../utils/color-from';
import dateFormat from '../utils/date-format';

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
  messageDivJoined: {
    display: 'block',
    textAlign: 'center',
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

const Message = ({ classes, sender, content, userId, statusMessage, createdAt }) => {
  const isMessageFromMe = sender._id === userId;
  const colorMessage = getColor(sender.username);

  const UserAvatar =  (
    <Avatar colorFrom={sender.username}>{ (sender.firstName && sender.lastName) ? sender.firstName + ' ' + sender.lastName : sender.username }</Avatar>
  );

  if (statusMessage) {
    return (
      <div className={ classnames(classes.MessageDiv, classes.messageDivJoined) }>
      <Typography variant="body1">
        <span style={{color: colorMessage}}>{sender.username}</span>{content}
      </Typography>
      <Typography variant="caption">{dateFormat(createdAt)}</Typography>
      </div>
    );
  }

  return (
    <div className={ classnames(classes.MessageDiv, isMessageFromMe && classes.messageDivFromMe) }>
      {!isMessageFromMe && UserAvatar}
      <Paper className={ classnames(classes.Message, isMessageFromMe && classes.messageFromMe) }>
        <Typography variant="caption" style={{color: colorMessage}}>
          {sender.username}
        </Typography>
        <Typography variant="body1">{content}</Typography>
        <Typography variant="caption">{dateFormat(createdAt)}</Typography>
      </Paper>
      {isMessageFromMe && UserAvatar}
    </div>
  )
}

export default withStyles(styles)(Message);
