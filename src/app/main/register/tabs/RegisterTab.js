import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@fuse/hooks";
import { TextField, CircularProgress } from "@material-ui/core";
import { signUp } from "app/store/actions";
import { useHistory } from "react-router-dom";

function RegisterTab(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const register = useSelector(({ auth }) => auth.register);
  const {
    error,
    //	user,
    loading
  } = useSelector(({ auth: { auth } }) => auth);
  // const [isFormValid, setIsFormValid] = useState(false);
  const [isShowError, setIsShowError] = useState(false);

  const { form, handleChange } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  function isFormValid() {
    return (
      form.first_name &&
      form.last_name &&
      form.email.length > 0 &&
      form.password.length > 0 &&
      form.password.length > 7 &&
      form.password === form.confirm_password
    );
  }

  function handleSignUpSuccess() {
    history.push("/dashboard");
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    setIsShowError(true);

    const body = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password
    };
    dispatch(signUp(body, handleSignUpSuccess));
    // resetForm();
  }
  return (
    <div className="w-full">
      <form name="registerForm" noValidate className="flex flex-col justify-center w-full" onSubmit={handleSubmit}>
        <TextField
          className="mb-16"
          label="First Name"
          type="name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          autoFocus
        />
        <TextField
          className="mb-16"
          label="Last Name"
          type="name"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          className="mb-16"
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  email
                </Icon>
              </InputAdornment>
            )
          }}
          required
          fullWidth
        />

        <TextField
          className="mb-16"
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  vpn_key
                </Icon>
              </InputAdornment>
            )
          }}
          error={!!(form.password && form.password.length > 0 && form.password.length < 8)}
          helperText={form.password && form.password.length > 0 && form.password.length < 8 && "Min character length is 8"}
          variant="outlined"
          required
          fullWidth
        />

        <TextField
          className="mb-16"
          label="Password (Confirm)"
          type="password"
          name="confirm_password"
          value={form.confirm_password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  vpn_key
                </Icon>
              </InputAdornment>
            )
          }}
          error={!!(form.confirm_password && form.password !== form.confirm_password)}
          helperText={!!(form.confirm_password && form.password !== form.confirm_password) && "Passwords dose not match"}
          variant="outlined"
          required
          fullWidth
        />

        {isShowError && error ? (
          <div className="flex justify-center" style={{ color: "red" }}>
            {error}
          </div>
        ) : (
          ""
        )}
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress style={{ marginRight: "5px", marginBottom: "5px" }} />
          </div>
        ) : (
          <Button variant="contained" color="primary" className="w-full mx-auto mt-16" aria-label="Register" disabled={!isFormValid()} type="submit">
            Register
          </Button>
        )}
      </form>
    </div>
  );
}

export default RegisterTab;
