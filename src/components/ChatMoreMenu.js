import React from 'react';
import { withStyles } from "material-ui/styles";
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const styles = theme => ({
})

class ChatMoreMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  
  render() {    
   const { user, leaveChatClick, deleteChatClick } = this.props;
   const { anchorEl } = this.state;
   const open = Boolean(anchorEl);

   return (
    <React.Fragment>
      <IconButton
        aria-owns={open ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={this.handleMenu}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={this.handleClose}
      >
      {
        user.isMember ? 
        <MenuItem onClick={leaveChatClick}>Leave chat</MenuItem> : 
        <MenuItem onClick={deleteChatClick}>Delete chat</MenuItem> 
      }
      </Menu>
    </React.Fragment>
    );
  }
}

export default withStyles(styles)(ChatMoreMenu);