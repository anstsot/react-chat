import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  NewChatButton: {
    position: 'absolute',
    left: 'auto',
    right: theme.spacing.unit * 3,
    //eslint-disable-next-line
    bottom: theme.spacing.unit * 3 + 48,
  },
});

const NewChatButton = ({ classes, messages }) => {
  return (
    <Button variant="fab" color="primary" aria-label="add" className={classes.NewChatButton}>
      <AddIcon />
    </Button>
  );
}

export default withStyles(styles)(NewChatButton);
