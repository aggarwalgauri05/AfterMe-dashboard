import React, { useState } from 'react';
import './Insurance.css';
import InsuranceFormModal from './InsuranceFormModal';

const Insurance = ({ onBack }) => {
  const [selectedInsurance, setSelectedInsurance] = useState(null);

  const [insurances, setInsurances] = useState([
    {
      id: 'life-insurance',
      title: 'Life Insurance',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M32 12 L20 20 L20 38 C20 46 26 52 32 52 C38 52 44 46 44 38 L44 20 Z" />
          <path d="M28 32 L30 34 L36 28" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'health-insurance',
      title: 'Health Insurance',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="18" width="28" height="28" rx="4" />
          <line x1="32" y1="26" x2="32" y2="38" strokeWidth="3" />
          <line x1="26" y1="32" x2="38" y2="32" strokeWidth="3" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'home-insurance',
      title: 'Home Insurance',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 30 L32 14 L52 30 L52 52 L12 52 Z" />
          <rect x="27" y="38" width="10" height="14" />
          <rect x="18" y="34" width="7" height="7" />
          <rect x="39" y="34" width="7" height="7" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'auto-insurance',
      title: 'Auto / Vehicle Insurance',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="14" y="26" width="36" height="16" rx="2" />
          <path d="M14 26 L18 18 L46 18 L50 26" />
          <circle cx="22" cy="42" r="4" />
          <circle cx="42" cy="42" r="4" />
          <rect x="24" y="22" width="7" height="8" />
          <rect x="33" y="22" width="7" height="8" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'travel-insurance',
      title: 'Travel Insurance',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="32" r="18" />
          <path d="M20 32 L32 20 L44 32" />
          <line x1="32" y1="20" x2="32" y2="44" />
          <line x1="20" y1="32" x2="44" y2="32" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'business-insurance',
      title: 'Business Insurance',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="16" width="32" height="36" />
          <rect x="22" y="10" width="20" height="8" rx="1" />
          <line x1="24" y1="26" x2="40" y2="26" />
          <line x1="24" y1="32" x2="40" y2="32" />
          <line x1="24" y1="38" x2="34" y2="38" />
        </svg>
      ),
      count: 0
    }
  ]);

  const handleSaveInsurance = (insuranceId) => {
    setInsurances(prev => prev.map(ins => ins.id === insuranceId ? { ...ins, count: (ins.count || 0) + 1 } : ins));
  };

  const handleInsuranceClick = (insurance) => {
    setSelectedInsurance(insurance);
  };

  const handleCloseModal = () => {
    setSelectedInsurance(null);
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
          <span className="breadcrumb-current">Insurance</span>
        </p>
      </div>

      <div className="devices-grid">
        {insurances.map((insurance) => (
          <div 
            key={insurance.id} 
            className="device-card"
            onClick={() => handleInsuranceClick(insurance)}
          >
            <div className="device-icon-circle">
              {insurance.icon}
            </div>
            <h3 className="device-title">{insurance.title}</h3>
            <div className="device-count">
              <span className="count-badge">{insurance.count} documents</span>
            </div>
          </div>
        ))}
      </div>

      {selectedInsurance && (
        <InsuranceFormModal 
          insurance={selectedInsurance}
          onClose={handleCloseModal}
          onSave={handleSaveInsurance}
        />
      )}
    </div>
  );
};

export default Insurance;