import React from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ErrorMessage from './ErrorMessage';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  formWrapper: {
    width: '100%',
    height: '100%',
    minHeight: `calc(100vh - 64px)`,
    marginTop: '64px',
    display: 'block',
    backgroundColor: '#d6e9f7',
  },
  divPaper: {
    width: 400,
    marginTop: theme.spacing.unit * 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.background.paper,
  }
});

class WelcomePage extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render () {
    const { classes, signup, login, isAuthenticated, error } = this.props;
    const { value } = this.state;

    if (isAuthenticated) {
      return (
        <Redirect to="/chat" />
      );
    }

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Welcome Page React Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={ classes.formWrapper }>
          <Paper className={ classes.divPaper } elevation={6}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} fullWidth>
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <LoginForm onSubmit={login}/>}
            {value === 1 && <SignUpForm onSubmit={signup}/>}
          </Paper>
        </div>
        <ErrorMessage error={error}/>
      </div>
    );
  };
}

export default withStyles(styles)(WelcomePage);
