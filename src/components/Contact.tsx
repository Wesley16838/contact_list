import * as React from "react";
import { useHistory } from "react-router-dom";
import * as types from "./../type";
import "./style.scss";
import images from "./../assets/images";

type Props = {
  contact: types.IContact;
  removeContact: any;
};

const Contact: React.FC<Props> = ({ contact, removeContact }) => {
  let history = useHistory();
  const [isActive, setIsActive] = React.useState(false);
  const [isRemove, setIsRemove] = React.useState(false);

  const handleOnRemove = () => {
    removeContact(contact);
    setIsRemove(false);
  };

  return (
    <div className="contact">
      <div className="contactBody">
        <div className="profileImage">
          <img src={images.icons.profileimage.default} alt="User" />
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
              <p>
                Are you sure you want to delete {contact.lastName}{" "}
                {contact.firstName}?
              </p>
              <p>If you delete it, it will not be recover!</p>
            </div>
            <div className="buttonGroup">
              <button onClick={() => setIsRemove(false)}>Cancal</button>
              <div />
              <button onClick={handleOnRemove}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
function equalFunction(prevProps: any, nextProps: any) {
  return (
    JSON.stringify(prevProps.contact) === JSON.stringify(nextProps.contact)
  );
}
export default React.memo(Contact, equalFunction);
