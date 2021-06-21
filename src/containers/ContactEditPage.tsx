import * as React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { Dispatch } from "redux";
import * as types from "./../type";
import { editContact } from "./../actions/";
import "./style.scss";
import { ContactForm } from "../components/ContactForm";

type RouteInfo = {
  id: string;
};

const ContactEditPage = ({ match }: RouteComponentProps<RouteInfo>) => {
  const dispatch: Dispatch<any> = useDispatch();
  const contactId = match.params.id;
  const editcontact = React.useCallback(
    (contact: types.IContact) => dispatch(editContact(contact)),
    [dispatch]
  );
  return (
    <main className="contactCreateWrapper">
      <div className="topBar">
        <h1>Edit Contact</h1>
        <Link to="/" className="link">
          <button className="backButton">Back</button>
        </Link>
      </div>
      <div className="contactForm">
        <ContactForm editContact={editcontact} id={contactId} />
      </div>
    </main>
  );
};

export default ContactEditPage;
