import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
  MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField
} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { wsMssgStartLoadpgn, wsMssgQuit } from "../../actions/serverActions";
import openingSearchNameDialogActions from '../../constants/openingSearchNameDialogActionTypes';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const ChessOpeningSearchNameDialog = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    wsMssgQuit(state).then(() => {
      wsMssgStartLoadpgn(state, movetext).then(() => {
        dispatch({ type: openingSearchNameDialogActions.CLOSE });
      });
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetch('https://pchess.net/api/opening', {
      method: 'POST',
      body: JSON.stringify({ name: event.target.elements.name.value })
    }).then(res => res.json())
      .then(res => setOpenings(res));
  }

  return (
    <Dialog open={state.openingSearchNameDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Name</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSearch}>
          <TextField fullWidth required name="name" label="Name" />
          <DialogActions>
            <Button type="submit">Search</Button>
            <Button onClick={() => {
              setOpenings([]);
              dispatch({ type: openingSearchNameDialogActions.CLOSE });
            }}>
              Cancel
            </Button>
          </DialogActions>
        </form>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableBody>
              {
                openings.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell align="right">{item.eco}</TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.movetext}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="load"
                        color="primary"
                        onClick={() => handleLoad(item.movetext)}
                      >
                        <PublishIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

export default ChessOpeningSearchNameDialog;
