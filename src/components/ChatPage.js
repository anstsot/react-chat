import React from 'react';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import Chat from './Chat';

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
    const {logout, chats, activeChat, user, addNewChat, sendMessage, editProfile } = this.props;

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
      </React.Fragment>
    );
  };
}

export default ChatPage;
