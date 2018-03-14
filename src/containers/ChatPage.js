import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout, getAllChats, getMyChats, setActiveChat, addNewChat, joinChat } from '../actions';
import * as chatFunctions from '../reducers/chats';
import ChatPage from '../components/ChatPage';

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    chats: {
        my: chatFunctions.getChatsByIds(state.chats, state.chats.myChats), 
        all: chatFunctions.getChatsByIds(state.chats, state.chats.allChats), 
    },
    activeChat: state.chats.activeChat,
    user: {
        ...state.auth.user,
        isMember: chatFunctions.isMember(state.auth.user._id, state.chats.activeChat),
        isCreator: chatFunctions.isCreator(state.auth.user._id, state.chats.activeChat),
        isChatMember: chatFunctions.isChatMember(state.auth.user._id, state.chats.activeChat),
    },
});

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
    setActiveChat,
    getAllChats,
    getMyChats,
    addNewChat,
    joinChat,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPage);
