import React, { useState } from 'react';
import './ImportantContacts.css';
import ContactFormModal from './ContactFormModal';

const ImportantContacts = ({ onBack }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [contacts, setContacts] = useState([
    {
      id: 'spouse-partner',
      title: 'Spouse or partner',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="24" cy="20" r="6" />
          <circle cx="40" cy="20" r="6" />
          <path d="M16 42 C16 36 20 32 24 32 C26 32 27 33 28 34" />
          <path d="M48 42 C48 36 44 32 40 32 C38 32 37 33 36 34" />
          <path d="M28 34 Q32 38 36 34" fill="none" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'closest-friends',
      title: 'Closest Friends',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="20" cy="22" r="5" />
          <circle cx="32" cy="22" r="5" />
          <circle cx="44" cy="22" r="5" />
          <path d="M12 42 C12 36 16 32 20 32 C24 32 28 36 28 42" />
          <path d="M24 42 C24 36 28 32 32 32 C36 32 40 36 40 42" />
          <path d="M36 42 C36 36 40 32 44 32 C48 32 52 36 52 42" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'lawyer',
      title: 'Lawyer',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="20" r="6" />
          <path d="M22 38 L22 50 L42 50 L42 38" />
          <rect x="26" y="36" width="12" height="8" />
          <path d="M20 36 L32 30 L44 36" />
          <line x1="32" y1="30" x2="32" y2="26" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'accountant',
      title: 'Accountant',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="20" y="16" width="24" height="32" rx="2" />
          <rect x="24" y="20" width="7" height="6" />
          <rect x="33" y="20" width="7" height="6" />
          <line x1="24" y1="30" x2="31" y2="30" />
          <line x1="33" y1="30" x2="40" y2="30" />
          <line x1="24" y1="34" x2="31" y2="34" />
          <line x1="33" y1="34" x2="40" y2="34" />
          <line x1="24" y1="40" x2="40" y2="40" strokeWidth="3" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'financial-planner',
      title: 'Financial Planner/ IFA',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="16" width="28" height="32" rx="2" />
          <circle cx="32" cy="28" r="6" />
          <text x="32" y="32" fontSize="8" textAnchor="middle" fill="currentColor" stroke="none">$</text>
          <line x1="22" y1="40" x2="42" y2="40" />
          <line x1="22" y1="44" x2="42" y2="44" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'family-doctor',
      title: 'Family Doctor or Clinic',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="20" y="18" width="24" height="28" rx="2" />
          <line x1="32" y1="26" x2="32" y2="36" strokeWidth="3" />
          <line x1="27" y1="31" x2="37" y2="31" strokeWidth="3" />
          <rect x="26" y="12" width="12" height="6" rx="1" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'clubs-association',
      title: 'Clubs or Association Memberships',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="28" r="12" />
          <path d="M22 40 Q22 34 28 34 L36 34 Q42 34 42 40" />
          <circle cx="32" cy="26" r="4" />
          <path d="M28 32 L24 38 M36 32 L40 38" strokeWidth="1.5" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'miscellaneous',
      title: 'Miscellaneous',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="26" r="8" />
          <path d="M20 42 C20 36 25 32 32 32 C39 32 44 36 44 42" />
          <line x1="32" y1="18" x2="32" y2="22" strokeWidth="2.5" />
        </svg>
      ),
      count: 0
    }
  ]);

  const handleSaveContact = (contactId) => {
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, count: (c.count || 0) + 1 } : c));
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  return (
    <div className="important-contacts-page">
      <div className="page-header">
        <h1 className="page-title">Legacy Assets Memories</h1>
        <p className="breadcrumb">
          <span className="breadcrumb-link" onClick={onBack} style={{ cursor: 'pointer' }}>
            My legacy assets memories
          </span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Important Contacts</span>
        </p>
      </div>

      <div className="contacts-grid">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className="contact-card"
            onClick={() => handleContactClick(contact)}
          >
            <div className="contact-icon-circle">
              {contact.icon}
            </div>
            <h3 className="contact-title">{contact.title}</h3>
            <div className="contact-count">
              <span className="count-badge">{contact.count} documents</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedContact && (
        <ContactFormModal 
          contact={selectedContact}
          onClose={handleCloseModal}
          onSave={handleSaveContact}
        />
      )}
    </div>
  );
};

export default ImportantContacts;