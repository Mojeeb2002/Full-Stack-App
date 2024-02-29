import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactsForm from './ContactsForm';
import './App.css';


function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts()
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
    console.log(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  }

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  }

  return (
  <>
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
    <button onClick={openCreateModal}>Create Contact</button>
    { isModalOpen && <div className="modal">
      <div className="modal-content">
        <span onClick={closeModal} className="close">&times;</span>
        <ContactsForm existingContact={currentContact} updateCallback={onUpdate}/>
      </div>
    </div> 
    }
    
  </>
  );
}

export default App;
