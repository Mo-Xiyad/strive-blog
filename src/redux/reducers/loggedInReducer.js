import { initialState } from "../index";
import {
  IS_USER_LOGGED_IN,
  IS_USER_ADMIN,
  LOGGED_IN_USERS_DATA,
} from "../actions";

const loggedInUserReducer = (state = initialState.loggedInOrNot, action) => {
  switch (action.type) {
    case IS_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case LOGGED_IN_USERS_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case IS_USER_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    default:
      return state;
  }
};

export default loggedInUserReducer;
