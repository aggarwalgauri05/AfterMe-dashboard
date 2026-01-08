import React, { useState } from 'react';
import './IdentificationDocuments.css';
import DocumentFormModal from './DocumentFormModal';

const IdentificationDocuments = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [documents, setDocuments] = useState([
    {
      id: 'passport',
      title: 'Passport/ ID card',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="12" width="28" height="40" rx="2" />
          <circle cx="32" cy="24" r="4" />
          <path d="M24 34 Q32 38 40 34" />
          <line x1="22" y1="42" x2="42" y2="42" />
          <line x1="22" y1="46" x2="42" y2="46" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'drivers-license',
      title: "Driver's Licence",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="14" y="20" width="36" height="24" rx="2" />
          <rect x="18" y="26" width="10" height="12" rx="1" />
          <line x1="32" y1="28" x2="44" y2="28" />
          <line x1="32" y1="32" x2="44" y2="32" />
          <line x1="32" y1="36" x2="40" y2="36" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'birth-certificate',
      title: 'Birth Certificate',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="12" width="32" height="40" rx="2" />
          <circle cx="32" cy="24" r="4" />
          <line x1="22" y1="34" x2="42" y2="34" />
          <line x1="22" y1="38" x2="42" y2="38" />
          <line x1="22" y1="42" x2="36" y2="42" />
          <path d="M38 46 L42 50 L48 42" strokeWidth="2.5" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'marriage-certificate',
      title: 'Marriage/civil union certificate',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="14" width="32" height="36" rx="2" />
          <path d="M26 24 C26 20 30 18 32 22 C34 18 38 20 38 24 C38 28 32 32 32 32 C32 32 26 28 26 24 Z" />
          <line x1="22" y1="38" x2="42" y2="38" />
          <line x1="22" y1="42" x2="42" y2="42" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'divorce-certificate',
      title: 'Divorce certificate',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="14" width="32" height="36" rx="2" />
          <circle cx="28" cy="26" r="4" />
          <circle cx="36" cy="26" r="4" />
          <line x1="24" y1="36" x2="40" y2="36" />
          <line x1="22" y1="42" x2="42" y2="42" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'medical-records',
      title: 'Medical records',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="12" width="28" height="40" rx="2" />
          <path d="M32 20 L32 32 M26 26 L38 26" strokeWidth="3" />
          <line x1="24" y1="38" x2="40" y2="38" />
          <line x1="24" y1="42" x2="40" y2="42" />
          <line x1="24" y1="46" x2="36" y2="46" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'miscellaneous',
      title: 'Miscellaneous',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="12" width="28" height="40" rx="2" />
          <line x1="24" y1="22" x2="40" y2="22" />
          <line x1="24" y1="28" x2="40" y2="28" />
          <line x1="24" y1="34" x2="40" y2="34" />
          <line x1="24" y1="40" x2="34" y2="40" />
        </svg>
      ),
      count: 0
    }
  ]);

  const handleSaveDocument = (docId) => {
    setDocuments((prev) => prev.map(d => d.id === docId ? { ...d, count: (d.count || 0) + 1 } : d));
  };

  const handleDocumentClick = (doc) => {
    setSelectedDocument(doc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };

  return (
    <div className="identification-documents-page">
      <div className="page-header">
        <h1 className="page-title">Legacy Assets Memories</h1>
        <p className="breadcrumb">
          <span className="breadcrumb-link">My legacy assets memories</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Identification & Documents</span>
        </p>
      </div>

      <div className="documents-grid">
        {documents.map((doc) => (
          <div 
            key={doc.id} 
            className="document-card"
            onClick={() => handleDocumentClick(doc)}
          >
            <div className="document-icon-circle">
              {doc.icon}
            </div>
            <h3 className="document-title">{doc.title}</h3>
            <div className="document-count">
              <span className="count-badge">{doc.count} documents</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedDocument && (
        <DocumentFormModal 
          document={selectedDocument}
          onClose={handleCloseModal}
          onSave={handleSaveDocument}
        />
      )}
    </div>
  );
};

export default IdentificationDocuments;