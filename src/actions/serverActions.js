import serverActionTypes from '../constants/serverActionTypes';
import { wsMssgListener } from '../listeners/wsMssgListener';

export const wsConnect = (state, props) => dispatch => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`${props.server.prot}://${props.server.host}:${props.server.port}`);
    ws.onmessage = (res) => {
      dispatch(wsMssgListener(JSON.parse(res.data)));
      resolve(res.data);
    };
    ws.onerror = (err) => {
      dispatch({ type: serverActionTypes.CONNECTION_ERROR });
      reject(err);
    };
    ws.onopen = () => {
      dispatch({ type: serverActionTypes.CONNECTION_ESTABLISHED, payload: { ws: ws } });
      resolve(ws);
    };
  });
};

export const wsMssgStartAnalysis = async (ws) => {
  return await ws.send('/start analysis');
};

export const wsMssgStartGrandmaster = async (state, color) => {
  return await state.server.ws.send(`/start grandmaster ${color}`);
};

export const wsMssgStartLoadfen = async (state, string) => {
  return await state.server.ws.send(`/start loadfen "${string}"`);
};

export const wsMssgStartPlayfriend = async (state, color, time, increment) => {
  return await state.server.ws.send(`/start playfriend ${color} ${time} ${increment}`);
};

export const wsMssgPlayfen = async (state) => {
  return await state.server.ws.send(`/play_fen "${state.board.fen}"`);
};

export const wsMssgQuit = async (state) => {
  return await state.server.ws.send('/quit');
};

export const wsMssgAccept = async (state, hash) => {
  return await state.server.ws.send(`/accept ${hash}`);
};

export const wsMssgPiece = async (state, algebraic) => {
  return await state.server.ws.send(`/piece ${algebraic}`);
};

export const wsMssgHeuristicpicture = async (state) => {
  return await state.server.ws.send(`/heuristic_picture`);
};

export const wsMssgFen = async (state) => {
  return await state.server.ws.send(`/fen`);
};

export const wsMssgTakeback = async (state, action) => {
  return await state.server.ws.send(`/takeback ${action}`);
};

export const wsMssgDraw = async (state, action) => {
  return await state.server.ws.send(`/draw ${action}`);
};

export const wsMssgUndoMove = async (state) => {
  return await state.server.ws.send(`/undo_move`);
};

export const wsMssgResign = async (state, action) => {
  return await state.server.ws.send(`/resign ${action}`);
};

export const wsMssgRematch = async (state, action) => {
  return await state.server.ws.send(`/rematch ${action}`);
};

export const wsMssgRestart = async (state) => {
  return await state.server.ws.send(`/restart ${state.mode.playfriend.hash}`);
};

export const wsMssgStartLoadpgn = async (state, movetext) => {
  return await state.server.ws.send(`/start loadpgn "${movetext}"`);
};

export const wsMssgResponse = async (state) => {
  return await state.server.ws.send(`/response`);
};
