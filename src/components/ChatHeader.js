import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ChatUserMenu from './ChatUserMenu';
import Avatar from './Avatar';
import ChatMoreMenu from './ChatMoreMenu';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: 'calc(100% - 320px)',
  },
  appTypography: {
    flex: 1,
    marginLeft: theme.spacing.unit,
  },
});

const ChatHeader = ({
  classes,
  logout,
  chatName,
  user,
  leaveChatClick,
  deleteChatClick,
  editProfile,
  isConnected,
}) => {
  const title = chatName || 'First React Chat';

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        {chatName ? <Avatar colorFrom={title}>{title}</Avatar> : null}
        <Typography className={classes.appTypography} variant="title" color="inherit" noWrap>
          {title}
          {user.isChatMember ? (
            <ChatMoreMenu
              disabled={!isConnected}
              user={user}
              leaveChatClick={leaveChatClick}
              deleteChatClick={deleteChatClick}
            />
          ) : null}
        </Typography>
        <ChatUserMenu
          disabled={!isConnected}
          onLogoutClick={logout}
          user={user}
          editProfile={editProfile}
        />
      </Toolbar>
    </AppBar>
  );
};

ChatHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
  chatName: PropTypes.string,
  logout: PropTypes.func.isRequired,
  leaveChatClick: PropTypes.func.isRequired,
  deleteChatClick: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

ChatHeader.defaultProps = {
  chatName: null,
};

export default withStyles(styles)(ChatHeader);
