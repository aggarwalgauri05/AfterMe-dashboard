import React, { useState } from 'react';
import './Financials.css';

const Investments = ({ onBack }) => {
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const [investments, setInvestments] = useState([
    {
      id: 'pensions',
      title: 'Pension(s)',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="32" r="20" />
          <path d="M32 12 L32 52" strokeWidth="3" />
          <path d="M12 32 L52 32" strokeWidth="3" />
          <path d="M22 22 L42 42" strokeWidth="2" />
          <path d="M42 22 L22 42" strokeWidth="2" />
          <circle cx="32" cy="32" r="8" strokeWidth="2" />
          <path d="M32 24 L32 40" strokeWidth="2" />
          <path d="M24 32 L40 32" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'pension'
    },
    {
      id: 'stocks-shares',
      title: 'Stocks or Shares Certificates',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="12" y="12" width="40" height="40" rx="2" />
          <line x1="12" y1="28" x2="52" y2="28" strokeWidth="2" />
          <line x1="12" y1="36" x2="52" y2="36" strokeWidth="2" />
          <line x1="12" y1="44" x2="52" y2="44" strokeWidth="2" />
          <line x1="24" y1="12" x2="24" y2="52" strokeWidth="2" />
          <line x1="36" y1="12" x2="36" y2="52" strokeWidth="2" />
          <line x1="48" y1="12" x2="48" y2="52" strokeWidth="2" />
          <path d="M20 20 L28 20 L28 24 L20 24 Z" strokeWidth="2" />
          <path d="M32 32 L40 32 L40 40 L32 40 Z" strokeWidth="2" />
          <path d="M44 24 L44 32 L48 32 L48 24 Z" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'stocks'
    },
    {
      id: 'investment-property',
      title: 'Investment Property',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 40 L32 24 L52 40 L52 52 L12 52 Z" />
          <rect x="22" y="32" width="20" height="20" />
          <rect x="26" y="36" width="12" height="8" rx="1" />
          <rect x="16" y="44" width="8" height="8" rx="1" />
          <rect x="40" y="44" width="8" height="8" rx="1" />
          <circle cx="32" cy="28" r="2" />
          <line x1="18" y1="32" x2="18" y2="52" strokeWidth="2" />
          <line x1="46" y1="32" x2="46" y2="52" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'property'
    },
    {
      id: 'alternatives',
      title: 'Alternatives (commodities)',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="32" r="20" />
          <circle cx="24" cy="24" r="4" strokeWidth="2" />
          <circle cx="40" cy="24" r="4" strokeWidth="2" />
          <circle cx="24" cy="40" r="4" strokeWidth="2" />
          <circle cx="40" cy="40" r="4" strokeWidth="2" />
          <path d="M32 18 L32 46" strokeWidth="2" />
          <path d="M18 32 L46 32" strokeWidth="2" />
          <path d="M22 22 L42 42" strokeWidth="2" />
          <path d="M42 22 L22 42" strokeWidth="2" />
          <path d="M28 28 L36 36" strokeWidth="2" />
          <path d="M36 28 L28 36" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'alternatives'
    },
    {
      id: 'miscellaneous-investments',
      title: 'Miscellaneous',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="16" width="32" height="32" rx="4" />
          <rect x="22" y="22" width="8" height="8" rx="1" />
          <rect x="34" y="22" width="8" height="8" rx="1" />
          <rect x="22" y="34" width="8" height="8" rx="1" />
          <rect x="34" y="34" width="8" height="8" rx="1" />
          <line x1="26" y1="22" x2="26" y2="30" strokeWidth="2" />
          <line x1="38" y1="22" x2="38" y2="30" strokeWidth="2" />
          <line x1="22" y1="26" x2="30" y2="26" strokeWidth="2" />
          <line x1="34" y1="26" x2="42" y2="26" strokeWidth="2" />
          <circle cx="32" cy="48" r="3" />
          <path d="M32 45 L32 51" strokeWidth="2" />
          <path d="M29 48 L35 48" strokeWidth="2" />
        </svg>
      ),
      count: 0,
      colorType: 'misc'
    }
  ]);

  const handleSaveInvestment = (investmentId) => {
    setInvestments(prev => prev.map(inv => 
      inv.id === investmentId ? { ...inv, count: (inv.count || 0) + 1 } : inv
    ));
  };

  const handleInvestmentClick = (investment) => {
    setSelectedInvestment(investment);
    // In a real app, this would open a modal
    console.log("Selected investment:", investment.title);
    // For now, just increment count to show it works
    handleSaveInvestment(investment.id);
  };

  const handleCloseModal = () => {
    setSelectedInvestment(null);
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
          <span className="breadcrumb-current">Investments (SS-2)</span>
        </p>
      </div>

      <div className="devices-grid">
        {investments.map((investment, index) => (
          <div 
            key={investment.id} 
            className="device-card"
            data-investment-type={investment.colorType}
            onClick={() => handleInvestmentClick(investment)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleInvestmentClick(investment)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="device-icon-circle">
              {investment.icon}
            </div>
            <h3 className="device-title">{investment.title}</h3>
            <div className="device-count">
              <span className="count-badge">
                {investment.count} {investment.count === 1 ? 'investment' : 'investments'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state message - matches Insurance page */}
      {investments.every(inv => inv.count === 0) && (
        <div className="empty-state-message">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
          <p>No investments added yet. Click on any investment type to add your first investment.</p>
        </div>
      )}
    </div>
  );
};

export default Investments;
export default Financials;
