import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  }
});

class SignUpForm extends React.Component {
  state = {
    username: '',
    password: '',
    repeatedPassword: '',
  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render () {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate>
        <TextField
          id="username"
          label="Username"
          placeholder="Type your username..."
          type="text"
          className={classes.textField}
          value={this.state.username}
          onChange={this.handleChange('username')}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="password"
          label="Password"
          placeholder="Type your password..."
          type="password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange('password')}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="repeatedPassword"
          label="Repeat password"
          placeholder="Type your password..."
          type="password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange('repeatedPassword')}
          margin="normal"
          fullWidth
          required
        />
        <Button fullWidth variant="raised" type="submit" color="primary" className={classes.button}>Login</Button>
      </form>
    );
  };
}

export default withStyles(styles)(SignUpForm);
