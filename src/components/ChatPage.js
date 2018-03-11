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
    const { setActiveChat, getAllChats, getMyChats, match } = this.props;
    
    Promise.all([
      getAllChats(),
      getMyChats(),
    ]).then(data => {
      if (match.params.id) setActiveChat(match.params.id);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { setActiveChat, match } = this.props;
    const { id: nextId } = nextProps.match.params;
    if (nextId && nextId !== match.params.id) setActiveChat(nextId);
  }

  render() {
    const {logout, chats, activeChat, user} = this.props;

    return (
      <React.Fragment>
        <ChatHeader logout={logout} chatName={activeChat && activeChat.title}/>
        <Sidebar chats={chats} activeChat={activeChat && activeChat._id}/>
        <Chat messages={activeChat && activeChat.messages} userId={user._id}/>
      </React.Fragment>
    );
  };
}

export default withStyles(styles)(ChatPage);
