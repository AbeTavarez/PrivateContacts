import ContactContext from "../../context/contact/contactContext";
import { useContext } from "react";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;

  return (
    <>
      {contacts.map((contact) => (
        <ContactItem contact={contact} key={contact.id} />
      ))}
    </>
  );
};

export default Contacts;
