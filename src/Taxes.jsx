import React, { useState } from 'react';
import './Taxes.css';
import TaxFormModal from './TaxFormModal';

const Taxes = ({ onBack }) => {
  const [selectedTax, setSelectedTax] = useState(null);

  const [taxes, setTaxes] = useState([
    {
      id: 'personal-tax',
      title: 'Personal Tax Returns',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="12" width="28" height="40" rx="2" />
          <line x1="24" y1="20" x2="40" y2="20" />
          <line x1="24" y1="26" x2="40" y2="26" />
          <line x1="24" y1="32" x2="36" y2="32" />
          <text x="32" y="45" fontSize="8" textAnchor="middle" fill="currentColor" stroke="none">TAX</text>
        </svg>
      ),
      count: 0
    },
    {
      id: 'business-tax',
      title: 'Business Tax Returns',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="14" width="32" height="36" rx="2" />
          <rect x="22" y="10" width="20" height="8" rx="1" />
          <line x1="22" y1="24" x2="42" y2="24" />
          <line x1="22" y1="30" x2="42" y2="30" />
          <line x1="22" y1="36" x2="36" y2="36" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'tax-advisor',
      title: 'Tax Advisor Details',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="22" r="8" />
          <path d="M18 46 C18 38 24 34 32 34 C40 34 46 38 46 46" />
          <rect x="28" y="42" width="8" height="6" />
          <line x1="32" y1="30" x2="32" y2="34" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'tax-documents',
      title: 'Tax Documents & Receipts',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 10 L20 54 L44 54 L44 18 L36 10 Z" />
          <path d="M36 10 L36 18 L44 18" />
          <line x1="26" y1="26" x2="38" y2="26" />
          <line x1="26" y1="32" x2="38" y2="32" />
          <line x1="26" y1="38" x2="32" y2="38" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'vat-gst',
      title: 'VAT / GST Records',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="16" width="28" height="32" rx="2" />
          <circle cx="32" cy="30" r="6" />
          <path d="M28 36 L32 40 L36 36" />
          <line x1="24" y1="22" x2="40" y2="22" />
        </svg>
      ),
      count: 0
    }
  ]);

  const handleSaveTax = (taxId) => {
    setTaxes(prev => prev.map(t => t.id === taxId ? { ...t, count: (t.count || 0) + 1 } : t));
  };

  const handleTaxClick = (tax) => {
    setSelectedTax(tax);
  };

  const handleCloseModal = () => {
    setSelectedTax(null);
  };

  return (
    <div className="key-devices-page">
      <div className="page-header">
        <h1 className="page-title">Legacy Assets Memories</h1>
        <p className="breadcrumb">
          <span className="breadcrumb-link" onClick={onBack} style={{ cursor: 'pointer' }}>
            My legacy assets memories
          </span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Tax</span>
        </p>
      </div>

      <div className="devices-grid">
        {taxes.map((tax) => (
          <div 
            key={tax.id} 
            className="device-card"
            onClick={() => handleTaxClick(tax)}
          >
            <div className="device-icon-circle">
              {tax.icon}
            </div>
            <h3 className="device-title">{tax.title}</h3>
            <div className="device-count">
              <span className="count-badge">{tax.count} documents</span>
            </div>
          </div>
        ))}
      </div>

      {selectedTax && (
        <TaxFormModal 
          tax={selectedTax}
          onClose={handleCloseModal}
          onSave={handleSaveTax}
        />
      )}
    </div>
  );
};

export default Taxes;