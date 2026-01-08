import React, { useState } from 'react';
import './BankAccounts.css';

const BankCurrencyAccounts = ({ onBack }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [accounts, setAccounts] = useState([
    {
      id: 'current-savings-accounts',
      title: 'Current & Savings Account(s)',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="12" y="16" width="40" height="32" rx="4" />
          <rect x="18" y="22" width="28" height="20" rx="2" />
          <circle cx="32" cy="32" r="6" />
          <line x1="26" y1="32" x2="38" y2="32" strokeWidth="3" />
          <line x1="32" y1="26" x2="32" y2="38" strokeWidth="3" />
          <rect x="28" y="52" width="8" height="4" rx="1" />
          <rect x="24" y="48" width="16" height="4" rx="1" />
        </svg>
      ),
      count: 0,
      colorType: 'savings'
    },
    {
      id: 'business-accounts',
      title: 'Business Account(s)',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="16" width="32" height="36" rx="2" />
          <rect x="22" y="10" width="20" height="8" rx="1" />
          <line x1="20" y1="26" x2="44" y2="26" strokeWidth="2" />
          <line x1="20" y1="32" x2="44" y2="32" strokeWidth="2" />
          <line x1="20" y1="38" x2="44" y2="38" strokeWidth="2" />
          <rect x="28" y="44" width="8" height="8" rx="1" />
          <line x1="32" y1="44" x2="32" y2="52" strokeWidth="2" />
          <line x1="28" y1="48" x2="36" y2="48" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'business'
    },
    {
      id: 'trust-accounts',
      title: 'Trust Account(s)',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M32 12 L20 24 L20 46 C20 50 22 54 26 54 L38 54 C42 54 44 50 44 46 L44 24 Z" />
          <rect x="26" y="28" width="12" height="8" rx="1" />
          <line x1="24" y1="40" x2="40" y2="40" strokeWidth="2" />
          <line x1="24" y1="44" x2="40" y2="44" strokeWidth="2" />
          <line x1="28" y1="48" x2="36" y2="48" strokeWidth="2" />
          <path d="M36 20 L40 24" strokeWidth="2" />
          <path d="M28 20 L24 24" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'trust'
    },
    {
      id: 'online-only-accounts',
      title: 'Online-only Account(s)',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="16" width="28" height="28" rx="4" />
          <circle cx="32" cy="30" r="6" />
          <line x1="32" y1="24" x2="32" y2="36" strokeWidth="3" />
          <line x1="26" y1="30" x2="38" y2="30" strokeWidth="3" />
          <path d="M22 46 L42 46" strokeWidth="2" />
          <path d="M24 50 L40 50" strokeWidth="2" />
          <circle cx="32" cy="54" r="2" />
          <circle cx="28" cy="54" r="1" />
          <circle cx="36" cy="54" r="1" />
        </svg>
      ),
      count: 0,
      colorType: 'online'
    },
    {
      id: 'digital-crypto-accounts',
      title: 'Digital / Cryptocurrency Account(s)',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="32" r="18" />
          <path d="M26 26 L38 38" strokeWidth="3" />
          <path d="M38 26 L26 38" strokeWidth="3" />
          <circle cx="26" cy="26" r="3" />
          <circle cx="38" cy="38" r="3" />
          <circle cx="38" cy="26" r="2" />
          <circle cx="26" cy="38" r="2" />
          <path d="M32 20 L32 24" strokeWidth="2" />
          <path d="M32 40 L32 44" strokeWidth="2" />
          <path d="M20 32 L24 32" strokeWidth="2" />
          <path d="M40 32 L44 32" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'crypto'
    },
    {
      id: 'miscellaneous-accounts',
      title: 'Miscellaneous',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="16" width="32" height="32" rx="4" />
          <rect x="22" y="22" width="8" height="8" rx="1" />
          <rect x="34" y="22" width="8" height="8" rx="1" />
          <rect x="22" y="34" width="8" height="8" rx="1" />
          <rect x="34" y="34" width="8" height="8" rx="1" />
          <line x1="28" y1="22" x2="28" y2="30" strokeWidth="2" />
          <line x1="40" y1="22" x2="40" y2="30" strokeWidth="2" />
          <line x1="22" y1="28" x2="30" y2="28" strokeWidth="2" />
          <line x1="34" y1="28" x2="42" y2="28" strokeWidth="2" />
          <circle cx="32" cy="48" r="3" />
          <path d="M32 45 L32 51" strokeWidth="2" />
          <path d="M29 48 L35 48" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'misc'
    }
  ]);

  const handleSaveAccount = (accountId) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === accountId ? { ...acc, count: (acc.count || 0) + 1 } : acc
    ));
  };

  const handleAccountClick = (account) => {
    setSelectedAccount(account);
    // In a real app, this would open a modal
    console.log("Selected account:", account.title);
    // For now, just increment count to show it works
    handleSaveAccount(account.id);
  };

  const handleCloseModal = () => {
    setSelectedAccount(null);
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
          <span className="breadcrumb-current">Bank & Currency Accounts (SS-1)</span>
        </p>
      </div>

      <div className="devices-grid">
        {accounts.map((account, index) => (
          <div 
            key={account.id} 
            className="device-card"
            data-account-type={account.colorType}
            onClick={() => handleAccountClick(account)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleAccountClick(account)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="device-icon-circle">
              {account.icon}
            </div>
            <h3 className="device-title">{account.title}</h3>
            <div className="device-count">
              <span className="count-badge">
                {account.count} {account.count === 1 ? 'account' : 'accounts'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state message - matches Insurance page */}
      {accounts.every(acc => acc.count === 0) && (
        <div className="empty-state-message">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
          <p>No bank accounts added yet. Click on any account type to add your first account.</p>
        </div>
      )}
    </div>
  );
};

export default BankCurrencyAccounts;
