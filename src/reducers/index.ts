import * as actionTypes from "./../actions/actionTypes";
import * as types from "./../type";

const initialState: types.ContactsState = {
  contacts: [
    {
      id: "1b9d612d-bbfd-rbfd-9bqd-ab4734bdefed",
      firstName: "Wei-Hsuan",
      lastName: "Wong",
      phoneNumber: "(405) 404-6584",
      email: "wesley16838@gmail.com",
    },
    {
      id: "14231ged-vl19-4122-1222-482998764bed",
      firstName: "Hsuan-Chi",
      lastName: "Wong",
      phoneNumber: "(206) 334-5306",
      email: "may66521@gmail.com",
    },
  ],
};

const reducer = (
  state: types.ContactsState = initialState,
  action: types.ContactAction
): types.ContactsState => {
  switch (action.type) {
    case actionTypes.ADD_CONTACT:
      const newContact: types.IContact = {
        id: action.contact.id,
        firstName: action.contact.firstName,
        lastName: action.contact.lastName,
        phoneNumber: action.contact.phoneNumber,
        email: action.contact.email,
      };
      return {
        ...state,
        contacts: state.contacts.concat(newContact),
      };
    case actionTypes.REMOVE_CONTACT:
      const updatedContacts: types.IContact[] = state.contacts.filter(
        (contact) => contact.id !== action.contact.id
      );
      return {
        ...state,
        contacts: updatedContacts,
      };
    case actionTypes.EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.contact.id
            ? {
                id: contact.id,
                firstName: action.contact.firstName,
                lastName: action.contact.lastName,
                email: action.contact.email,
                phoneNumber: action.contact.phoneNumber,
              }
            : contact
        ),
      };
  }
  return state;
};

export default reducer;
