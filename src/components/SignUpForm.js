import PropTypes from 'prop-types';
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

class SignUpForm extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    username: {
      value: '',
      isValid: true,
    },
    password: {
      value: '',
      isValid: true,
    },
    repeatedPassword: {
      value: '',
      isValid: true,
    },
  };

  validate = () => {
    const { password, repeatedPassword } = this.state;
    const isValid = password.value === repeatedPassword.value;

    this.setState({
      password: { ...password, isValid },
      repeatedPassword: { ...repeatedPassword, isValid },
    });

    return isValid;
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

    if (!this.validate()) return;

    const { username, password } = this.state;

    this.props.onSubmit(username.value, password.value);
  };

  render() {
    const { classes } = this.props;
    const { username, password, repeatedPassword } = this.state;

    return (
      <form className={classes.container} onSubmit={this.handleSubmit}>
        <TextField
          fullWidth
          required
          label="Username"
          placeholder="Type your username..."
          type="text"
          name="username"
          className={classes.textField}
          value={username.value}
          onChange={this.handleInputChange}
          autoComplete="username"
          margin="normal"
          error={!username.isValid}
        />
        <TextField
          fullWidth
          required
          label="Password"
          placeholder="Type your password..."
          type="password"
          name="password"
          className={classes.textField}
          value={password.value}
          onChange={this.handleInputChange}
          margin="normal"
          error={!password.isValid}
          autoComplete="new-password"
        />
        <TextField
          fullWidth
          required
          label="Repeat password"
          placeholder="Type your password..."
          type="password"
          name="repeatedPassword"
          className={classes.textField}
          value={repeatedPassword.value}
          onChange={this.handleInputChange}
          margin="normal"
          error={!repeatedPassword.isValid}
          autoComplete="new-password"
        />
        <Button fullWidth variant="raised" type="submit" color="primary" className={classes.button}>
          Sign Up
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(SignUpForm);
