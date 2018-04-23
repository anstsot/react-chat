import PropTypes from 'prop-types';
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
    backgroundColor: '#e6dcff',
  },
});

const Message = ({
  classes, sender, content, userId, statusMessage, createdAt,
}) => {
  // eslint-disable-next-line
  const isMessageFromMe = sender._id === userId;
  const userName =
    sender.firstName && sender.lastName
      ? `${sender.firstName} ${sender.lastName}`
      : sender.username;
  const colorMessage = getColor(userName);

  const UserAvatar = <Avatar colorFrom={userName}>{userName}</Avatar>;

  if (statusMessage) {
    return (
      <div className={classnames(classes.MessageDiv, classes.messageDivJoined)}>
        <Typography variant="body1">
          <span style={{ color: colorMessage }}>{userName}</span>
          {content}
        </Typography>
        <Typography variant="caption">{dateFormat(createdAt)}</Typography>
      </div>
    );
  }

  return (
    <div className={classnames(classes.MessageDiv, isMessageFromMe && classes.messageDivFromMe)}>
      {!isMessageFromMe && UserAvatar}
      <Paper className={classnames(classes.Message, isMessageFromMe && classes.messageFromMe)}>
        <Typography variant="caption" style={{ color: colorMessage }}>
          {userName}
        </Typography>
        <Typography variant="body1">{content}</Typography>
        <Typography variant="caption">{dateFormat(createdAt)}</Typography>
      </Paper>
      {isMessageFromMe && UserAvatar}
    </div>
  );
};

Message.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  content: PropTypes.string.isRequired,
  sender: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  statusMessage: PropTypes.bool,
};

Message.defaultProps = {
  statusMessage: false,
};

export default withStyles(styles)(Message);
