import React,{useState} from "react";
import { Button, Dialog, CircularProgress,TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { useForm } from "@fuse/hooks";

function DeleteDialog(props) {

const defaultFormState = {
  passcode: ""
  };
  const { form, handleChange,setInForm } = useForm(defaultFormState);

  function handleDelete(ev) {
    ev.preventDefault();

    props.success();
  }

  function handleClick() {
    props.handleClick();
  }

  function handleClose() {
    setInForm("passcode","")
     props.close()
  }

  const isMatchPasscord = process.env.REACT_APP_DELETE_PASSCODE===form.passcode


  return (
    <>
      {/* <Button
      variant="contained"
      color="secondary"
      className="w-12 m-4"
      aria-label="Reset"
      size="small"
     
    >
    delete
    </Button> */}
      <IconButton style={props.deleteButtonStyle ? { ...props.deleteButtonStyle } : {}} onClick={event => handleClick()}>
        <Icon>delete</Icon>
      </IconButton>
      {props.open&&(
          <Dialog
          classes={{
            paper: "m-24"
          }}
          open={props.open}
          onClose={props.close}
          fullWidth
          maxWidth="xs"
          >
      <form id="calculator" name="calculator" onSubmit={handleDelete} >

          <div style={{ display: "flex", flexFlow: "column",alignItems:"center", padding: "16px" }}>
            <span className="flex justify-center w-full p-4">
              <span style={{ padding: "16px", fontSize: "26px" }}>{props.title}</span>
            </span>
            <TextField
            className="mb-16"
            style={{maxWidth:"280px"}}
            label="Passcode"
            autoFocus
            id="passcode"
            name="passcode"
            value={form.passcode}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
            <div className="flex justify-center w-full p-4">
              <Button className="w-12 m-4" variant="outlined" disabled={props.loading} onClick={handleClose}>
                no
              </Button>

              <Button variant="contained" color="primary" className="w-12 m-4" 
              disabled={props.loading||!isMatchPasscord} 
              type="submit"
              //onClick={handleDelete}
              >
                {props.loading && <CircularProgress size={14} />}
                {!props.loading && "yes"}
              </Button>
            </div>
          </div>
          </form>
          </Dialog>
      )}
     
    </>
  );
}

DeleteDialog.propTypes = {
  loading: PropTypes.bool,
  handleClick: PropTypes.func,
  success: PropTypes.func,
  open: PropTypes.bool,
  close: PropTypes.func,
  title: PropTypes.string,
  deleteButtonStyle: PropTypes.object
};

DeleteDialog.defaultProps = {
  title: "Are you sure?"
};

export default DeleteDialog;
