import * as React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as types from "./../type";
import { Contact } from "./../components/Contact";
import { removeContact, editContact } from "./../actions/";
import btmImage from "./../assets/images/addIcon.png";
import "./style.scss";

const ContactPage: React.FC = () => {
  const contacts: readonly types.IContact[] = useSelector(
    (state: types.ContactsState) => state.contacts,
    shallowEqual
  );

  return (
    <main className="contactListWrapper">
      <div className="topBar">
        <h1>Contacts</h1>
        <Link to="/create" className="link">
          <button className="addButton">
            <img src={btmImage} />
          </button>
        </Link>
      </div>

      <div className="contactList">
        {contacts.map((contact: types.IContact) => (
          <Contact
            key={contact.phoneNumber}
            contact={contact}
            removeContact={removeContact}
            editContact={editContact}
          />
        ))}
      </div>
    </main>
  );
};

export default ContactPage;
