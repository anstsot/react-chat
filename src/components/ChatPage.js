import React from 'react';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import { withStyles } from 'material-ui/styles';
import { messages } from '../mock-data';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

class ChatPage extends React.Component {
  componentDidMount(){
    const { getAllChats, getMyChats } = this.props;
    
    Promise.all([
      getAllChats(),
      getMyChats(),
    ]);
  }

  render() {
    const {logout, chats} = this.props;

    return (
      <React.Fragment>
        <ChatHeader logout={logout} />
        <Sidebar chats={chats} />
        <Chat messages={messages} />
      </React.Fragment>
    );
  };
}

export default withStyles(styles)(ChatPage);
