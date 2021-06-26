import * as React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { Dispatch } from "redux";
import * as types from "./../type";
import ContactForm from "../components/ContactForm";
import { addContact } from "./../actions/";
import "./style.scss";

const ContactCreatePage: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  // const addNewContact = React.useCallback(
  //   (contact: types.IContact) => dispatch(addContact(contact)),
  //   [dispatch, addContact]
  // );
  const addNewContact = (contact: types.IContact) =>
    dispatch(addContact(contact));

  return (
    <main className="contactCreateWrapper">
      <div className="topBar">
        <h1>Create New Contact</h1>
        <Link to="/" className="link">
          <button className="backButton">Back</button>
        </Link>
      </div>
      <div className="contactForm">
        <ContactForm addContact={addNewContact} />
      </div>
    </main>
  );
};

export default ContactCreatePage;
