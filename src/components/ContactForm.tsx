import React, { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  uuidv4,
  validateEmail,
  validatePhoneNumber,
  formatPhoneNumber,
} from "../utility";
import * as types from "../type";

type Props = {
  addContact?: any;
  editContact?: any;
  id?: string;
};

const ContactForm: React.FC<Props> = ({ addContact, editContact, id }) => {
  let history = useHistory();
  const contacts: readonly types.IContact[] = useSelector(
    (state: types.ContactsState) => state.contacts,
    shallowEqual
  );
  const [contact, setContact] = React.useState<types.IContact>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [errorMsg, setErrorMsg] = React.useState("");
  const [userExist, setUserExist] = React.useState(true);

  useEffect(() => {
    if (id) {
      let contact: any = contacts.find(
        (contact: types.IContact) => contact.id === id
      );
      if (contact) {
        setContact({
          id: contact && contact.id,
          firstName: contact && contact.firstName,
          lastName: contact && contact.lastName,
          email: contact && contact.email,
          phoneNumber: contact && contact.phoneNumber,
        });
      } else {
        setUserExist(false);
        setErrorMsg("Cannot find contact");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateUser = (data: any) => {
    for (let i = 0; i < contacts.length; i++) {
      if (
        contacts[i].id !== data.id &&
        contacts[i].phoneNumber === data.phoneNumber
      )
        return false;
    }
    return true;
  };

  const handleContactData = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "phoneNumber") {
      let val = formatPhoneNumber(e.currentTarget.value);
      setContact({
        ...contact,
        [e.currentTarget.id]: val,
      });
    } else {
      setContact({
        ...contact,
        [e.currentTarget.id]: e.currentTarget.value,
      });
    }
  };

  const addNewContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      contact.email.length === 0 ||
      contact.phoneNumber.length === 0 ||
      contact.firstName.length === 0 ||
      contact.lastName.length === 0
    ) {
      setErrorMsg("Please fill all fields!");
    } else {
      if (
        validateEmail(contact.email) &&
        validatePhoneNumber(contact.phoneNumber) &&
        validateUser(contact)
      ) {
        if (addContact) {
          contact.id = uuidv4();
          addContact(contact);
        }
        if (editContact) {
          editContact(contact);
        }
        history.push("/");
      } else {
        setErrorMsg("Wrong Format or Contact has already existed!");
      }
    }
  };

  return (
    <>
      {userExist ? (
        <form onSubmit={addNewContact} className="addContact">
          <div className="contactBody">
            <div className="formSection">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                onChange={handleContactData}
                value={contact.firstName}
              />
            </div>
            <div className="formSection">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={handleContactData}
                value={contact.lastName}
              />
            </div>
            <div className="formSection">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                onChange={handleContactData}
                value={contact.phoneNumber}
              />
            </div>
            <div className="formSection">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleContactData}
                value={contact.email}
              />
            </div>
          </div>

          <button>{addContact ? "Add Contact" : "Edit Contact"}</button>
          {errorMsg.length !== 0 && <p className="error">{errorMsg}</p>}
        </form>
      ) : (
        <p className="error">{errorMsg}</p>
      )}
    </>
  );
};

export default React.memo(ContactForm);
