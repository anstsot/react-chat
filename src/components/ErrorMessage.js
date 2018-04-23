import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

class ErrorMessage extends React.Component {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if ( nextProps.error ) {
      this.setState({ open: true });
    }
  }

  handleCloseMessage = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    const { error } = this.props;

    if ( !error ) {
      return null;
    }

    return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleCloseMessage}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{error.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseMessage}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    );
  }
}

export default ErrorMessage;