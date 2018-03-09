import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout, getAllChats, getMyChats } from '../actions';
import * as chatFunctions from '../reducers/chats';
import ChatPage from '../components/ChatPage';

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    chats: chatFunctions.getChatsByIds(state.chats, state.chats.allChats),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
    getAllChats,
    getMyChats,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPage);
