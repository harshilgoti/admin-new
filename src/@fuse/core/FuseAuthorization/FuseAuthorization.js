import FuseUtils from "@fuse/utils";
import AppContext from "app/AppContext";
import React, { Component } from "react";
import { connect } from "react-redux";
import { matchRoutes } from "react-router-config";
import { withRouter } from "react-router-dom";
import { fetchUser } from "app/store/actions";

class FuseAuthorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: false,
      routes,
      redirectUrl: ""
    };
  }

  componentDidMount() {
    if (!this.props.user && localStorage.getItem("user-token")) {
      this.props.fetchUser();
    }
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }
  redirectRoute() {
    const { location, history } = this.props;
    const { pathname, state } = location;
    const matched = matchRoutes(this.state.routes, pathname)[0];
    const redirectUrl = state && state.redirectUrl ? state.redirectUrl : pathname;
    if (matched) {
      if (matched.route.isAuth && !localStorage.getItem("user-token")) {
        history.push({
          pathname: "/login"
        });
      }
      if (!matched.route.isAuth && localStorage.getItem("user-token")) {
        history.push({
          pathname: "/events"
        });
      }
    } else {
      history.push({
        pathname: redirectUrl
      });
    }
  }
  static getDerivedStateFromProps(props, state) {
    const { location, userPermissions } = props;
    const { pathname } = location;

    const matched = matchRoutes(state.routes, pathname)[0];

    const isTokenAvialable = FuseUtils.hasPermission(matched.route.auth, userPermissions)
      ? localStorage.getItem("user-token")
        ? false
        : true
      : false;
    if ((matched && matched.route.isAuth && isTokenAvialable) || (matched && !matched.route.isAuth && !isTokenAvialable)) {
      return {
        accessGranted: false
      };
    } else {
      return {
        accessGranted: matched ? FuseUtils.hasPermission(matched.route.auth, userPermissions) : true
      };
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  render() {
    return this.state.accessGranted ? (
      <React.Fragment>{this.props.children}</React.Fragment>
    ) : (
      // <AccessDeniedPage />
      <h1>No page for you!</h1>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    userRole: auth.user.role,
    user: auth.auth.user,
    userPermissions: ["admin"]
  };
}

FuseAuthorization.contextType = AppContext;

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchUser
    }
  )(FuseAuthorization)
);
