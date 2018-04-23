/* eslint no-underscore-dangle: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import ErrorMessage from './ErrorMessage';

class ChatPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    chats: PropTypes.shape({
      my: PropTypes.array.isRequired,
      all: PropTypes.array.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      my: PropTypes.array.isRequired,
      all: PropTypes.array.isRequired,
    }).isRequired,
    activeChat: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    error: PropTypes.instanceOf(Error),
    setActiveChat: PropTypes.func.isRequired,
    getAllChats: PropTypes.func.isRequired,
    getMyChats: PropTypes.func.isRequired,
    socketConnect: PropTypes.func.isRequired,
    mountChat: PropTypes.func.isRequired,
    unmountChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    joinChat: PropTypes.func.isRequired,
    deleteChat: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    addNewChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    activeChat: null,
    error: null,
  };

  componentDidMount() {
    const {
      setActiveChat, getAllChats, getMyChats, match, socketConnect, mountChat,
    } = this.props;

    Promise.all([getAllChats(), getMyChats()])
      .then(() => {
        socketConnect();
      })
      .then(() => {
        const { id } = match.params;
        if (id) {
          setActiveChat(id);
          mountChat(id);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const {
      setActiveChat, match, mountChat, unmountChat,
    } = this.props;
    const { id: nextId } = nextProps.match.params;
    if (nextId && nextId !== match.params.id) {
      unmountChat(match.params.id);
      setActiveChat(nextId);
      mountChat(nextId);
    }
  }

  leaveChatClick = () => {
    const { activeChat, leaveChat } = this.props;
    leaveChat(activeChat._id);
  };

  joinChatClick = () => {
    const { activeChat, joinChat } = this.props;
    joinChat(activeChat._id);
  };

  deleteChatClick = () => {
    const { activeChat, deleteChat } = this.props;
    deleteChat(activeChat._id);
  };

  deleteChatClick = () => {
    const { activeChat, deleteChat } = this.props;
    deleteChat(activeChat._id);
  };

  render() {
    const {
      logout,
      chats,
      activeChat,
      user,
      addNewChat,
      sendMessage,
      editProfile,
      error,
      isConnected,
    } = this.props;

    return (
      <React.Fragment>
        <ChatHeader
          logout={logout}
          user={user}
          leaveChatClick={this.leaveChatClick}
          deleteChatClick={this.deleteChatClick}
          chatName={activeChat && activeChat.title}
          editProfile={editProfile}
          isConnected={isConnected}
        />
        <Sidebar
          chats={chats}
          addNewChat={addNewChat}
          activeChat={activeChat && activeChat._id}
          isConnected={isConnected}
        />
        <Chat
          messages={activeChat && activeChat.messages}
          user={user}
          joinChatClick={this.joinChatClick}
          activeChat={activeChat}
          sendMessage={sendMessage}
          isConnected={isConnected}
        />
        <ErrorMessage error={error} />
      </React.Fragment>
    );
  }
}

export default ChatPage;
