import React, { useEffect, useState } from "react";
import axios from "../utils/api";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch contacts", error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="contacts">
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <h3>{contact.name}</h3>
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p>
            <p>Address: {contact.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;