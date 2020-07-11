import { CLOSE_DIALOG, OPEN_DIALOG } from "./actionTypes";

export function closeDialog() {
  return {
    type: CLOSE_DIALOG
  };
}

export function openDialog(options) {
  return {
    type: OPEN_DIALOG,
    options
  };
}
