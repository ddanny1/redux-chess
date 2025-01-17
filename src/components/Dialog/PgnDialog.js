import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import pgnDialogActions from "../../constants/pgnDialogActionTypes";

const PgnDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Dialog open={state.pgnDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>PGN Movetext</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            fullWidth
            name="pgn"
            disabled
            value={state.board.movetext ? state.board.movetext : ''}
          />
          <DialogActions>
            <Button
              onClick={() => {
                state.board.movetext ? navigator.clipboard.writeText(state.board.movetext) : null;
                dispatch({ type: pgnDialogActions.CLOSE });
              }}
            >
              Copy
            </Button>
            <Button onClick={() => dispatch({ type: pgnDialogActions.CLOSE })}>
              Close
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PgnDialog;
