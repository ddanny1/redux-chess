import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useDispatch, useSelector } from 'react-redux';
import { goToBeginning, goBack, goForward, goToEnd } from '../actions/historyActions';

const History = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
      <Button
        startIcon={<FastRewindIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch(goToBeginning({ back: state.board.history.length - 1}))}
      />
      <Button
        startIcon={<SkipPreviousIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch(goBack())}
      />
      <Button
        startIcon={<SkipNextIcon />}
        disabled={state.history.back === 0}
        onClick={() => dispatch(goForward())}
      />
      <Button
        startIcon={<FastForwardIcon />}
        disabled={state.history.back === 0}
        onClick={() => dispatch(goToEnd())}
      />
    </ButtonGroup>
  );
}

export default History;
