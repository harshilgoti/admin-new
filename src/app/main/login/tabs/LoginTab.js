import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "app/store/actions";
import { useForm } from "@fuse/hooks";
import { TextField, CircularProgress } from "@material-ui/core";

function LoginTab(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  // const login = useSelector(({ auth }) => auth.login);
  const {
    error,
    // user,
    loading
  } = useSelector(({ auth: { auth } }) => auth);
  const [isShowError, setIsShowError] = useState(false);

  const { form, handleChange } = useForm({
    email: "",
    password: ""
  });

  function handleSignUpSuccess() {
    history.push("/events");
  }

  function isFormValid() {
    return form.email && form.password.length > 7;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    setIsShowError(true);
    const user = {
      email: form.email,
      password: form.password,
      role: "admin"
    };

    dispatch(userLogin(user, handleSignUpSuccess));
  }

  return (
    <div className="w-full">
      <form name="registerForm" noValidate className="flex flex-col justify-center w-full" onSubmit={handleSubmit}>
        <TextField
          value={form.email}
          onChange={handleChange}
          className="mb-16"
          type="text"
          name="email"
          label="Email"
          validations={{
            minLength: 10
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  email
                </Icon>
              </InputAdornment>
            )
          }}
          variant="outlined"
          required
        />

        <TextField
          className="mb-16"
          type="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          validations={{
            minLength: 8
          }}
          error={!!(form.password && form.password.length > 0 && form.password.length < 8)}
          helperText={form.password && form.password.length > 0 && form.password.length < 8 && "Min character length is 8"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  vpn_key
                </Icon>
              </InputAdornment>
            )
          }}
          variant="outlined"
          required
        />
        {isShowError && error ? (
          <div className="flex justify-center" style={{ color: "red", marginBottom: "12px" }}>
            {error}
          </div>
        ) : (
          ""
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto normal-case"
          aria-label="LOG IN"
          disabled={!isFormValid() || loading}
          value="firebase"
          // style={loading ? { pointerEvents: "none", opacity: 0.8 } : {}}
        >
          {loading && <CircularProgress size={18} className="mb-2" />}
          {!loading && "Log In"}
        </Button>
      </form>
    </div>
  );
}

export default LoginTab;
