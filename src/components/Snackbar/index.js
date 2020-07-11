import React from "react";
import Notifier from "components/Notifier";
import { withSnackbar } from "notistack";

function Snackbar(props) {
  return (
    <>
      <Notifier />
      {props.children}
    </>
  );
}

export default withSnackbar(Snackbar);
