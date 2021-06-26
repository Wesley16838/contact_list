import * as React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { BrowserRouter as Route, Link } from "react-router-dom";
import * as types from "./../type";
import Contact from "./../components/Contact";
import { removeContact } from "./../actions/";
import btmImage from "./../assets/images/addIcon.png";
import "./style.scss";

const ContactPage: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const contacts: readonly types.IContact[] = useSelector(
    (state: types.ContactsState) => state.contacts,
    shallowEqual
  );

  // use usecallback to prevent re-render
  const deleteContact = React.useCallback(
    (contact: types.IContact) => dispatch(removeContact(contact)),
    [dispatch]
  );

  return (
    <main className="contactListWrapper">
      <div className="topBar">
        <h1>Contacts</h1>
        <Link to="/create" className="link">
          <button className="addButton">
            <img src={btmImage} alt="add" />
          </button>
        </Link>
      </div>

      <div className="contactList">
        {contacts.length > 0 ? (
          contacts.map((contact: types.IContact) => (
            <Contact
              key={contact.phoneNumber}
              contact={contact}
              removeContact={deleteContact}
            />
          ))
        ) : (
          <p>No Contact</p>
        )}
      </div>
    </main>
  );
};

export default ContactPage;
