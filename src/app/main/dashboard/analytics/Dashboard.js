import withReducer from "app/store/withReducer";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import { enqueueSnackbar } from "../../../store/actions";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.getWidgets());
  }, [dispatch]);

  function success() {
    dispatch(
      enqueueSnackbar({
        message: `Successfully done the operation.`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success"
        }
      })
    );
  }
  function error() {
    dispatch(
      enqueueSnackbar({
        message: `Something went wrong.`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "error"
        }
      })
    );
  }
  function warning() {
    dispatch(
      enqueueSnackbar({
        message: `Be careful of what you just did!`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning"
        }
      })
    );
  }
  function info() {
    dispatch(
      enqueueSnackbar({
        message: `For your info...`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "info"
        }
      })
    );
  }
  return (
    <div className="w-full">
      <div className="mt-16 flex justify-around">
        <Button className="m-2" variant="contained" onClick={success} color="default">
          success
        </Button>
        <Button className="m-2" variant="contained" color="secondary" onClick={error}>
          error
        </Button>
        <Button className="m-2" variant="contained" onClick={warning}>
          warning
        </Button>
        <Button className="m-2" variant="contained" onClick={info} color="secondary">
          info
        </Button>
      </div>
    </div>
  );
}

export default withReducer("analyticsDashboardApp", reducer)(Dashboard);
