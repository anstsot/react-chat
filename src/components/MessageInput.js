import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';

const styles = theme => ({
  MessageInputDiv: {
    position: 'fixed',
    left: 'auto',
    right: 0,
    bottom: 0,
    width: 'calc(100% - 320px)',
    padding: theme.spacing.unit * 3,
    backgroundColor: 'rgba(63, 81, 181, 0.2)',
    boxSizing: 'border-box',
  },
  MessageInput: {
    padding: theme.spacing.unit * 2,
  },
});

class MessageInput extends React.Component {
  state = {
    value: '',
  };

  handleMessageChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleKeyPress = (event) => {
    const { value } = this.state;

    if (event.key === 'Enter' && value) {
      this.props.sendMessage(value);
      this.setState({ value: '' });
    }
  };

  render() {
    const { classes, disabled } = this.props;

    return (
      <div className={classes.MessageInputDiv}>
        <Paper className={classes.MessageInput} elevation={6}>
          <Input
            disabled={disabled}
            fullWidth
            placeholder="Type your message…"
            value={this.state.value}
            onChange={this.handleMessageChange}
            onKeyPress={this.handleKeyPress}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MessageInput);
