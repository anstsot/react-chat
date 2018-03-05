import React from 'react';
import { withStyles } from 'material-ui/styles';
import Message from './Message';

const styles = theme => ({
  MessageList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
});

class MessageList extends React.Component {
  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    const messagesWrapper = this.refs.messagesWrapper;
    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  }

  render() {
    const { classes, messages } = this.props;

    return (
      <div className={classes.MessageList} ref="messagesWrapper">
        { messages && messages.map((message, key) => 
          <Message key={key} {...message} />
        )}
      </div>
    );
};
}

export default withStyles(styles)(MessageList);
