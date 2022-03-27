import { createStore } from "redux";

const initialState = {
  accessToken: null,
  isShowProcessOverlay: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "update_is_show_process_overlay":
      return { ...state, isShowProcessOverlay: action.value };

    case "update_access_token":
      return { ...state, accessToken: action.value };
  }
  return state;
};

const Store = createStore(reducer);

export default Store;
