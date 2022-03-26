import { createStore } from "redux";

const initialState = {
  userDetails: {},
  accessToken: null,
  isShowProcessOverlay: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "update_is_show_process_overlay":
      return { ...state, isShowProcessOverlay: action.value };

    // case REDUX.UPDATE_USER_DETAILS:
    //   return { ...state, userDetails: action.value };

    // case REDUX.UPDATE_ACCESS_TOKEN:
    //   return { ...state, accessToken: action.value };
  }
  return state;
};

const Store = createStore(reducer);

export default Store;
