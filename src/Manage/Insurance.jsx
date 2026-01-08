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
          <path d="M32 42 L32 46" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      count: 0,
      colorType: 'life'
    },
    {
      id: 'health-insurance',
      title: 'Health Insurance',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="18" width="28" height="28" rx="4" />
          <line x1="32" y1="26" x2="32" y2="38" strokeWidth="3" />
          <line x1="26" y1="32" x2="38" y2="32" strokeWidth="3" />
          <path d="M22 22 L42 42" strokeWidth="2" strokeLinecap="round" strokeDasharray="2,2" />
          <path d="M42 22 L22 42" strokeWidth="2" strokeLinecap="round" strokeDasharray="2,2" />
        </svg>
      ),
      count: 0,
      colorType: 'health'
    },
    {
      id: 'personal-accident-insurance',
      title: 'Personal Accident / Disability',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="32" r="18" />
          <path d="M28 28 L36 36" strokeWidth="3" />
          <path d="M36 28 L28 36" strokeWidth="3" />
          <circle cx="32" cy="24" r="2" />
          <circle cx="32" cy="40" r="2" />
          <path d="M24 32 L28 32" strokeWidth="2" />
          <path d="M36 32 L40 32" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'accident'
    },
    {
      id: 'critical-illness-insurance',
      title: 'Critical Illness / Income Protection',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="32" r="20" />
          <path d="M24 24 L40 40" strokeWidth="3" />
          <path d="M40 24 L24 40" strokeWidth="3" />
          <path d="M32 22 L32 30" strokeWidth="2" />
          <path d="M32 34 L32 42" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'critical'
    },
    {
      id: 'home-contents-insurance',
      title: 'Home / Contents Insurance',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 30 L32 14 L52 30 L52 52 L12 52 Z" />
          <rect x="27" y="38" width="10" height="14" />
          <rect x="18" y="34" width="7" height="7" />
          <rect x="39" y="34" width="7" height="7" />
          <circle cx="32" cy="26" r="2" />
        </svg>
      ),
      count: 0,
      colorType: 'home'
    },
    {
      id: 'vehicle-insurance',
      title: 'Vehicle Insurance',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="14" y="26" width="36" height="16" rx="2" />
          <path d="M14 26 L18 18 L46 18 L50 26" />
          <circle cx="22" cy="42" r="4" />
          <circle cx="42" cy="42" r="4" />
          <rect x="24" y="22" width="7" height="8" />
          <rect x="33" y="22" width="7" height="8" />
          <line x1="20" y1="32" x2="44" y2="32" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'auto'
    },
    {
      id: 'business-commercial-insurance',
      title: 'Business Commercial Insurance',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="16" width="32" height="36" />
          <rect x="22" y="10" width="20" height="8" rx="1" />
          <line x1="24" y1="26" x2="40" y2="26" />
          <line x1="24" y1="32" x2="40" y2="32" />
          <line x1="24" y1="38" x2="34" y2="38" />
          <line x1="28" y1="44" x2="36" y2="44" />
        </svg>
      ),
      count: 0,
      colorType: 'business'
    },
    {
      id: 'funeral-insurance',
      title: 'Funeral Insurance / Funeral Plan',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M32 16 L20 28 L20 48 L44 48 L44 28 Z" />
          <circle cx="32" cy="38" r="6" />
          <line x1="32" y1="32" x2="32" y2="44" />
          <line x1="28" y1="38" x2="36" y2="38" />
          <path d="M28 54 L36 54" strokeWidth="2" />
          <path d="M26 58 L38 58" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'funeral'
    },
    {
      id: 'miscellaneous-insurance',
      title: 'Miscellaneous',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="14" width="28" height="36" rx="2" />
          <rect x="22" y="20" width="6" height="6" rx="1" />
          <rect x="32" y="20" width="6" height="6" rx="1" />
          <rect x="22" y="30" width="6" height="6" rx="1" />
          <rect x="32" y="30" width="6" height="6" rx="1" />
          <rect x="22" y="40" width="6" height="6" rx="1" />
          <rect x="32" y="40" width="6" height="6" rx="1" />
          <line x1="42" y1="20" x2="42" y2="46" />
          <line x1="40" y1="46" x2="44" y2="46" />
        </svg>
      ),
      count: 0,
      colorType: 'misc'
    }
  ]);

  const handleSaveInsurance = (insuranceId) => {
    setInsurances(prev => prev.map(ins => 
      ins.id === insuranceId ? { ...ins, count: (ins.count || 0) + 1 } : ins
    ));
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
          <span 
            className="breadcrumb-link" 
            onClick={onBack} 
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onBack()}
          >
            My legacy assets memories
          </span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Insurance</span>
        </p>
      </div>

      <div className="devices-grid">
        {insurances.map((insurance, index) => (
          <div 
            key={insurance.id} 
            className="device-card"
            data-insurance-type={insurance.colorType}
            onClick={() => handleInsuranceClick(insurance)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleInsuranceClick(insurance)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="device-icon-circle">
              {insurance.icon}
            </div>
            <h3 className="device-title">{insurance.title}</h3>
            <div className="device-count">
              <span className="count-badge">
                {insurance.count} {insurance.count === 1 ? 'document' : 'documents'}
              </span>
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

      {/* Empty state message */}
      {insurances.every(ins => ins.count === 0) && (
        <div className="empty-state-message">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
          <p>No insurance documents added yet. Click on any insurance type to add your first document.</p>
        </div>
      )}
    </div>
  );
};

export default Insurance;
