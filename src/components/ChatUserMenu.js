import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

const styles = () => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class ChatUserMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
    editProfile: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  state = {
    anchorEl: null,
    openModal: null,
    username: {
      value: this.props.user.username,
      isValid: true,
    },
    firstName: {
      value: this.props.user.firstName,
      isValid: true,
    },
    lastName: {
      value: this.props.user.lastName,
      isValid: true,
    },
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleModalClose = () => {
    this.setState({ openModal: null });
    this.handleClose();
  };

  handleLogoutClick = () => {
    this.props.onLogoutClick();
    this.handleClose();
  };

  handleInputChange = (event) => {
    event.persist();
    const { name, value } = event.target;

    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  handleProfileSubmit = () => {
    const { username, firstName, lastName } = this.state;

    this.props.editProfile({
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    });
    this.handleModalClose();
    this.handleClose();
  };

  render() {
    const { classes, disabled } = this.props;
    const {
      anchorEl, openModal, username, firstName, lastName,
    } = this.state;
    const open = Boolean(anchorEl);
    const openm = Boolean(openModal);

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
          disabled={disabled}
        >
          <AccountCircle />
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
          <MenuItem onClick={this.handleOpen}>Profile</MenuItem>
          <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
        </Menu>
        <Dialog open={openm} onClose={this.handleModalClose}>
          <DialogTitle>Edit your profile</DialogTitle>
          <DialogContent className={classes.modalNewChat}>
            <TextField
              label="Change username"
              placeholder="Change username"
              type="text"
              value={username.value}
              name="username"
              autoComplete="username"
              margin="normal"
              error={!username.isValid}
              onChange={this.handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Change first name"
              placeholder="Change first name"
              type="text"
              value={firstName.value}
              name="firstName"
              autoComplete="firstName"
              margin="normal"
              error={!firstName.isValid}
              onChange={this.handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Change last name"
              placeholder="Change last name"
              type="text"
              value={lastName.value}
              name="lastName"
              autoComplete="lastName"
              margin="normal"
              error={!lastName.isValid}
              onChange={this.handleInputChange}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleProfileSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ChatUserMenu);
