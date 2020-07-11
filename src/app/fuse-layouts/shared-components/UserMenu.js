import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "app/store/actions";

function UserMenu(props) {
  const dispatch = useDispatch();
  // let history = useHistory()

  const user = useSelector(({ auth }) => auth.auth.user);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = event => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const userLogout = () => {
    setUserMenu(null);
    dispatch(logout());
  };
  return (
    <>
      <Button className="h-64" onClick={userMenuClick}>
        {user && user.image_url ? (
          <Avatar className="" alt="user photo" src={user.image_url} />
        ) : (
          <Avatar className="">{user && user.first_name[0].toUpperCase()}</Avatar>
        )}

        <div className="hidden md:flex flex-col mx-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {user && user.first_name}
          </Typography>
          {/* <Typography className="text-11 capitalize" color="textSecondary">
            {user.role.toString()}
          </Typography> */}
        </div>

        <Icon className="text-16 hidden sm:flex" variant="action">
          keyboard_arrow_down
        </Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        classes={{
          paper: "py-8"
        }}
      >
        {/* {!user.role || user.role.length === 0 ? (
					<>
						<MenuItem component={Link} to="/login" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem>
						<MenuItem component={Link} to="/register" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>person_add</Icon>
							</ListItemIcon>
							<ListItemText primary="Register" />
						</MenuItem>
					</>
				) : ( */}
        <>
          <MenuItem component={Link} to="/profile" onClick={userMenuClose} role="button">
            <ListItemIcon className="min-w-40">
              <Icon>account_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
          {/* <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>mail</Icon>
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</MenuItem> */}
          <MenuItem
            onClick={() => {
              //dispatch(authActions.logoutUser());
              userLogout();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>exit_to_app</Icon>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </>
        {/* )} */}
      </Popover>
    </>
  );
}

export default UserMenu;
