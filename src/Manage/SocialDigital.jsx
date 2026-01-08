import React, { useState } from 'react';
import './SocialDigital.css';
import SocialDigitalFormModal from './SocialDigitalFormModal';

const SocialDigital = ({ onBack }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [accounts, setAccounts] = useState([
    {
      id: 'social-media',
      title: 'Social Media',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="32" r="20" />
          <circle cx="32" cy="26" r="6" />
          <path d="M20 44 C20 36 24 32 32 32 C40 32 44 36 44 44" />
          <circle cx="18" cy="18" r="4" />
          <circle cx="46" cy="18" r="4" />
          <circle cx="18" cy="46" r="4" />
          <circle cx="46" cy="46" r="4" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'email',
      title: 'Email',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="10" y="16" width="44" height="32" rx="2" />
          <path d="M10 16 L32 32 L54 16" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'online-accounts',
      title: 'Online Accounts',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="32" r="20" />
          <path d="M32 12 C32 12 20 20 20 32 C20 44 32 52 32 52" />
          <path d="M32 12 C32 12 44 20 44 32 C44 44 32 52 32 52" />
          <line x1="12" y1="32" x2="52" y2="32" />
          <path d="M18 22 Q32 24 46 22" />
          <path d="M18 42 Q32 40 46 42" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'non-digital',
      title: 'Non-Digital',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="12" width="32" height="40" rx="2" />
          <line x1="24" y1="22" x2="40" y2="22" />
          <line x1="24" y1="30" x2="40" y2="30" />
          <line x1="24" y1="38" x2="36" y2="38" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'miscellaneous',
      title: 'Miscellaneous',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="14" y="14" width="36" height="36" rx="4" />
          <circle cx="26" cy="26" r="3" />
          <circle cx="38" cy="26" r="3" />
          <circle cx="26" cy="38" r="3" />
          <circle cx="38" cy="38" r="3" />
        </svg>
      ),
      count: 0
    }
  ]);

  const handleSaveAccount = (accountId) => {
    setAccounts(prev => prev.map(a => a.id === accountId ? { ...a, count: (a.count || 0) + 1 } : a));
  };

  const handleAccountClick = (account) => {
    setSelectedAccount(account);
  };

  const handleCloseModal = () => {
    setSelectedAccount(null);
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
          <span className="breadcrumb-current">Social & Digital</span>
        </p>
      </div>

      <div className="devices-grid">
        {accounts.map((account) => (
          <div 
            key={account.id} 
            className="device-card"
            onClick={() => handleAccountClick(account)}
          >
            <div className="device-icon-circle">
              {account.icon}
            </div>
            <h3 className="device-title">{account.title}</h3>
            <div className="device-count">
              <span className="count-badge">{account.count} documents</span>
            </div>
          </div>
        ))}
      </div>

      {selectedAccount && (
        <SocialDigitalFormModal 
          account={selectedAccount}
          onClose={handleCloseModal}
          onSave={handleSaveAccount}
        />
      )}
    </div>
  );
};

export default SocialDigital;