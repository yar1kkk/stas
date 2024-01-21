import React, { useEffect, useState } from 'react';
import './Form.css';

export const Form = () => {
  const [contacts, setContacts] = useState([
    {
      name: 'Izhak',
      phone: '+3807983123',
      id: '12234y2u1',
    },
  ]);
  const [contactData, setContactData] = useState({ name: '', phone: '' });

  useEffect(() => {
    fetch('http://localhost:8080/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  const handleInputChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleCreateContact = (e) => {
    fetch('http://localhost:8080/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts([...contacts, data]);
        setContactData({ name: '', phone: '' });
      })
      .catch((error) => console.error('Error creating contact:', error));
  };

  const handleDeleteContact = (id) => {
    fetch(`http://localhost:8080/contacts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted contact from the state
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== id)
        );
      })
      .catch((error) => console.error('Error deleting contact:', error));
  };

  const handleEditContact = (id) => {
    fetch(`http://localhost:8080/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    }).catch((error) => console.error('Error editing contact:', error));
  };

  return (
    <>
      <h1>Contact Manager</h1>
      <form>
        <h2>Create New Contact</h2>
        <div className="inputBox">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={contactData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputBox">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={contactData.phone}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleCreateContact}>Create Contact</button>
      </form>
      <h2>Phone book</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.phone}
            <button
              className="listButton"
              onClick={() => handleDeleteContact(contact.id)}
            >
              Delete
            </button>
            <button
              className="listButton"
              onClick={() => handleEditContact(contact.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
