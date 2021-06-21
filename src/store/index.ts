import { createStore, applyMiddleware, Store } from "redux";
import reducer from "../reducers";
import * as types from "./../type";

const saveToLocalStorage = (state: any) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const store: Store<types.ContactsState, types.ContactAction> & {
  dispatch: types.DispatchType;
} = createStore(reducer, loadFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
