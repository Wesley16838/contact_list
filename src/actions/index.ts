import * as actionTypes from "./actionTypes";
import * as types from "../type";

export const addContact = (contact: types.IContact) => ({
  type: actionTypes.ADD_CONTACT,
  contact,
});

export const removeContact = (contact: types.IContact) => ({
  type: actionTypes.REMOVE_CONTACT,
  contact,
});

export const editContact = (contact: types.IContact) => ({
  type: actionTypes.EDIT_CONTACT,
  contact,
});
