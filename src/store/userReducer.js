// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
  userDetails: {},
  token: "",
  loggedIn: false
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        ...action.payload,
        loggedIn: true
      };
    default:
      return state;
  }
};

export default userReducer;
