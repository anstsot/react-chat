/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Message from './Message';

const styles = () => ({
  messWrapper: {
    height: '100%',
    width: '100%',
    paddingTop: '64px',
    paddingBottom: '120px',
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
    if (this.messagesWrapper) {
      this.messagesWrapper.scrollIntoView(false);
    }
  }

  render() {
    const { classes, messages, userId } = this.props;

    return messages && messages.length ? (
      <div
        className={classes.messWrapper}
        ref={(wrapper) => {
          this.messagesWrapper = wrapper;
        }}
      >
        {messages.map(message => <Message key={message._id} userId={userId} {...message} />)}
      </div>
    ) : (
      <Typography variant="display1">There is no messages yet...</Typography>
    );
  }
}

export default withRouter(withStyles(styles)(MessageList));
