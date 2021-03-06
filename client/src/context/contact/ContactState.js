import { useReducer } from "react";
import {v4 as uuidv4} from "uuid";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  SET_ALERT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  UPDATE_CONTACT,
} from "../types";

// State
const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 1,
                name: 'Sarah Johnson',
                email: 'sarah@gmail.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 1,
                name: 'Harry White',
                email: 'hary@gmail.com',
                phone: '333-333-3333',
                type: 'professional'
            },
        ]
    };

    const [ state, dispatch ] = useReducer(contactReducer, initialState);
    //* =========== Actions

    // Add Contact
    const addContact = (contact) => {
        contact.id = uuidv4();
        dispatch({type: ADD_CONTACT, payload: contact})
    }

    // Delete Contact

    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contacts

    // Clear Filter

    return (
        <contactContext.Provider value={{
            contacts: state.contacts,
            addContact
        }}>
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;
