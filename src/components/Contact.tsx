import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as types from "./../type";
import "./style.scss";
import profileImg from "./../assets/images/defaultProfileImage.png";
import images from "./../assets/images";

type Props = {
  contact: types.IContact;
  removeContact: (contact: types.IContact) => void;
  editContact: (contact: types.IContact) => void;
};

export const Contact: React.FC<Props> = ({
  contact,
  removeContact,
  editContact,
}) => {
  let history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();
  const [isActive, setIsActive] = React.useState(false);
  const [isRemove, setIsRemove] = React.useState(false);

  const editContent = React.useCallback(
    (contact: types.IContact) => dispatch(editContact(contact)),
    [dispatch, editContact]
  );

  const deleteContact = React.useCallback(
    (contact: types.IContact) => dispatch(removeContact(contact)),
    [dispatch, removeContact]
  );

  const handleOnRemove = () => {
    deleteContact(contact);
    setIsRemove(false);
  };

  return (
    <div className="contact">
      <div className="contactBody">
        <div className="profileImage">
          <img src={images.icons.profileimage.default} alt="Profile Image" />
        </div>
        <div className="contactInfo">
          <p>
            {contact.lastName} {contact.firstName}
          </p>
          <p>{contact.phoneNumber}</p>
        </div>
        <div className="contactBtn">
          <button onClick={() => setIsActive(!isActive)}>
            {isActive ? (
              <img src={images.icons.close_icon.default} alt="Close" />
            ) : (
              <img src={images.icons.open_icon.default} alt="Open" />
            )}
          </button>
          <button onClick={() => history.push(`/edit/${contact.id}`)}>
            <img src={images.icons.edit_icon.default} alt="Edit" />
          </button>
          <button onClick={() => setIsRemove(true)}>
            <img src={images.icons.remove_icon.default} alt="Remove" />
          </button>
        </div>
      </div>
      {isActive && (
        <div className="contactDetail">
          <p>First Name: {contact.firstName}</p>
          <p>Last Name: {contact.lastName}</p>
          <p>Phone Number: {contact.phoneNumber}</p>
          <p>Email: {contact.email}</p>
        </div>
      )}
      {isRemove && (
        <div className="modal">
          <div className="modalContainer">
            <div className="warning">
              <p>Are you sure you want to delete</p>
              <p>
                {contact.lastName} {contact.firstName}
              </p>
            </div>
            <div className="buttonGroup">
              <button onClick={() => setIsRemove(false)}>Cancal</button>
              <button onClick={handleOnRemove}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
