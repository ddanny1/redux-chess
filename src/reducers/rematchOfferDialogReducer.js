import rematchOfferDialogActionTypes from '../constants/rematchOfferDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case rematchOfferDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case rematchOfferDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
