import React from 'react';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import ErrorMessage from './ErrorMessage';

class ChatPage extends React.Component {
  componentDidMount(){
    const { setActiveChat, getAllChats, getMyChats, match, socketConnect, mountChat } = this.props;
    
    Promise.all([
      getAllChats(),
      getMyChats(),
    ]).then(() => {
      socketConnect();
    }).then(() => {
      const { id } = match.params;
      if (id) {
        setActiveChat(id);
        mountChat(id);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { setActiveChat, match, mountChat, unmountChat } = this.props;
    const { id: nextId } = nextProps.match.params;
    if (nextId && nextId !== match.params.id) {
      unmountChat(match.params.id);
      setActiveChat(nextId);
      mountChat(nextId);
    }
  }

  joinChatClick = () => {
    const { activeChat, joinChat } = this.props;
    joinChat(activeChat._id);
  }

  leaveChatClick = () => {
    const { activeChat, leaveChat } = this.props;
    leaveChat(activeChat._id);
  }

  deleteChatClick = () => {
    const { activeChat, deleteChat } = this.props;
    deleteChat(activeChat._id);
  }

  deleteChatClick = () => {
    const { activeChat, deleteChat } = this.props;
    deleteChat(activeChat._id);
  }

  render() {
    const {logout, chats, activeChat, user, addNewChat, sendMessage, editProfile, error } = this.props;

    return (
      <React.Fragment>
        <ChatHeader 
          logout={logout} 
          user={user} 
          leaveChatClick={this.leaveChatClick} 
          deleteChatClick={this.deleteChatClick} 
          chatName={activeChat && activeChat.title}
          editProfile={editProfile}
        />
        <Sidebar chats={chats} addNewChat={addNewChat} activeChat={activeChat && activeChat._id}/>
        <Chat 
          messages={activeChat && activeChat.messages} 
          user={user} 
          joinChatClick={this.joinChatClick}
          activeChat={activeChat}
          sendMessage={sendMessage}
        />
        <ErrorMessage error={error} />
      </React.Fragment>
    );
  };
}

export default ChatPage;
