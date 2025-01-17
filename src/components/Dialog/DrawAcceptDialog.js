import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { wsMssgDraw } from "../../actions/serverActions";
import drawAcceptDialogActionTypes from "../../constants/drawAcceptDialogActionTypes";
import Wording from "../../utils/Wording.js";

const DrawAcceptDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDrawAccept = (event) => {
    event.preventDefault();
    wsMssgDraw(state, Wording.verb.ACCEPT.toLowerCase()).then((data) => {
      dispatch({ type: drawAcceptDialogActionTypes.CLOSE });
    });
  };

  const handleDrawDecline = (event) => {
    event.preventDefault();
    wsMssgDraw(state, Wording.verb.DECLINE.toLowerCase()).then(() => {
      dispatch({ type: drawAcceptDialogActionTypes.CLOSE });
    });
  };

  return (
    <Dialog open={state.drawAcceptDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>A draw is being offered</DialogTitle>
      <DialogContent>
        <form onSubmit={handleDrawAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={handleDrawDecline}>Decline</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DrawAcceptDialog;
