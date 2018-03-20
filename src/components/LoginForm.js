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
  },
});

class LoginForm extends React.Component {
  state = {
    username: {
      value: '',
      isValid: true,
    },
    password: {
      value: '',
      isValid: true,
    },
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.onSubmit(username.value, password.value);
  };

  render() {
    const { classes } = this.props;
    const { username, password } = this.state;

    return (
      <form className={classes.container} onSubmit={this.handleSubmit}>
        <TextField
          label="Username"
          placeholder="Type your username..."
          type="text"
          className={classes.textField}
          value={username.value}
          name="username"
          onChange={this.handleInputChange}
          autoComplete="username"
          margin="normal"
          error={!username.isValid}
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Type your password..."
          type="password"
          className={classes.textField}
          value={password.value}
          name="password"
          onChange={this.handleInputChange}
          autoComplete="password"
          margin="normal"
          error={!password.isValid}
          fullWidth
          required
        />
        <Button fullWidth variant="raised" type="submit" color="primary" className={classes.button}>
          Login
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
