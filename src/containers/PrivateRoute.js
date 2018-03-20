import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import { recieveAuth } from '../actions';

class PrivateRoute extends React.Component {
    componentDidMount() {
      this.props.recieveAuth();
    }

    render() {
      const { component: Component, isAuthenticated, ...rest } = this.props;
  
      return (
        <Route {...rest} render={props => (
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/welcome',
              state: { from: props.location }
            }} />
          )
        )} />
      );
    };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
  
const mapDispatchToProps = dispatch => bindActionCreators({
  recieveAuth,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute);
