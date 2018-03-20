import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

const styles = theme => ({
  MessageInputDiv: {
    position: 'fixed',
    left: 'auto',
    right: 0,
    bottom: 0,
    width: `calc(100% - 320px)`,
    padding: theme.spacing.unit * 3,
    backgroundColor: 'rgba(63, 81, 181, 0.2)',
    boxSizing: 'border-box',
  },
  MessageInput: {
    padding: theme.spacing.unit * 2,
  },
});

class MessageInput extends React.Component {
  render() {
    const { classes, joinChatClick, disabled } = this.props;
    
    return (
      <div className={classes.MessageInputDiv}>
        <Paper className={classes.MessageInput} elevation={6}>
          <Button disabled={disabled} variant="raised" color="primary" fullWidth onClick={joinChatClick}>Join</Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MessageInput);
