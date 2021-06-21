export interface IContact {
  id: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
}

export type ContactsState = {
  contacts: IContact[];
};

export type ContactAction = {
  type: string;
  contact: IContact;
};

export type DispatchType = (arg: ContactAction) => ContactAction;
