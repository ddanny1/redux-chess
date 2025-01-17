import React from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import BlackTimer from './BlackTimer';
import WhiteTimer from './WhiteTimer';

const useStyles = makeStyles({
  timers: {
    color:"#707070",
    fontWeight: "bold",
    marginTop: "0.25em !important",
  },
});

const GameClock = () => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.mode.playfriend.accepted) {
    if (!state.board.mate &&
      !state.mode.playfriend.draw &&
      !state.mode.playfriend.resign
    ) {
      return (
        <div className={classes.timers}>
          <WhiteTimer /><BlackTimer />
        </div>
      );
    }
  }

  return null;
}

export default GameClock;
