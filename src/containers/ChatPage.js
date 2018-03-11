import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout, getAllChats, getMyChats, setActiveChat } from '../actions';
import * as chatFunctions from '../reducers/chats';
import ChatPage from '../components/ChatPage';

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    chats: chatFunctions.getChatsByIds(state.chats, state.chats.allChats),
    activeChat: state.chats.activeChat,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
    setActiveChat,
    getAllChats,
    getMyChats,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPage);
