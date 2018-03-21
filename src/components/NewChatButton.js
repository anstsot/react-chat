import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

const styles = theme => ({
  NewChatButton: {
    position: 'absolute',
    left: 'auto',
    right: theme.spacing.unit * 3,
    bottom: (theme.spacing.unit * 3) + 48,
  },
  modalNewChat: {
    width: '300px',
  },
});

class NewChatButton extends React.Component {
  state = {
    openModal: false,
    title: {
      value: '',
      isValid: true,
    },
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  handleAddNewChatClick = () => {
    this.setState({ openModal: true });
  };

  handleInputChange = (event) => {
    event.persist();
    this.setState({
      title: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  handleAddNewChatSubmit = () => {
    const { title } = this.state;
    if (!title.value) {
      this.setState({
        title: {
          value: title.value,
          isValid: false,
        },
      });

      return;
    }

    this.props.addNewChatClick(title.value);
    this.handleClose();
    this.setState({
      title: {
        value: '',
        isValid: true,
      },
    });
  };

  render() {
    const { classes, disabled } = this.props;
    const { title, openModal } = this.state;

    return (
      <React.Fragment>
        <Button
          disabled={disabled}
          variant="fab"
          color="primary"
          aria-label="add"
          className={classes.NewChatButton}
          onClick={this.handleAddNewChatClick}
        >
          <AddIcon />
        </Button>
        <Dialog open={openModal} onClose={this.handleClose}>
          <DialogTitle>Create new chat</DialogTitle>
          <DialogContent className={classes.modalNewChat}>
            <TextField
              autoFocus
              label="New chat title"
              placeholder="New chat title"
              type="text"
              value={title.value}
              name="title"
              autoComplete="title"
              margin="normal"
              error={!title.isValid}
              onChange={this.handleInputChange}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddNewChatSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NewChatButton);
