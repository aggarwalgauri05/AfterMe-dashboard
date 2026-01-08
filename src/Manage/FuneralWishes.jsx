import React, { useState } from 'react';
import './FuneralWishes.css';
import FuneralWishesFormModal from './FuneralWishesFormModal';

const FuneralWishes = ({ onBack }) => {
  const [selectedWish, setSelectedWish] = useState(null);

  const [wishes, setWishes] = useState([
    {
      id: 'choice-of-funeral',
      title: 'Choice of Funeral',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M32 12 L32 32 L32 52" />
          <circle cx="32" cy="32" r="16" />
          <path d="M20 28 L44 28" />
          <path d="M20 36 L44 36" />
          <rect x="16" y="48" width="32" height="8" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'funeral-wake-wishes',
      title: 'Funeral/Wake Wishes',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M32 16 L32 48" />
          <circle cx="32" cy="24" r="6" />
          <path d="M24 32 Q32 28 40 32" />
          <path d="M20 40 Q32 36 44 40" />
          <rect x="16" y="48" width="32" height="4" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'invitees',
      title: 'Invitees',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="24" r="8" />
          <path d="M18 48 Q18 36 32 36 Q46 36 46 48" />
          <circle cx="20" cy="28" r="6" />
          <circle cx="44" cy="28" r="6" />
          <path d="M12 48 Q12 40 20 40" />
          <path d="M52 48 Q52 40 44 40" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'miscellaneous',
      title: 'Miscellaneous',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="16" width="32" height="32" rx="4" />
          <line x1="24" y1="28" x2="40" y2="28" />
          <line x1="24" y1="36" x2="40" y2="36" />
          <line x1="24" y1="44" x2="32" y2="44" />
        </svg>
      ),
      count: 0
    }
  ]);

  const handleSaveWish = (wishId) => {
    setWishes(prev => prev.map(w => w.id === wishId ? { ...w, count: (w.count || 0) + 1 } : w));
  };

  const handleWishClick = (wish) => {
    setSelectedWish(wish);
  };

  const handleCloseModal = () => {
    setSelectedWish(null);
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
          <span className="breadcrumb-current">Funeral Wishes</span>
        </p>
      </div>

      <div className="devices-grid">
        {wishes.map((wish) => (
          <div 
            key={wish.id} 
            className="device-card"
            onClick={() => handleWishClick(wish)}
          >
            <div className="device-icon-circle">
              {wish.icon}
            </div>
            <h3 className="device-title">{wish.title}</h3>
            <div className="device-count">
              <span className="count-badge">{wish.count} documents</span>
            </div>
          </div>
        ))}
      </div>

      {selectedWish && (
        <FuneralWishesFormModal 
          wish={selectedWish}
          onClose={handleCloseModal}
          onSave={handleSaveWish}
        />
      )}
    </div>
  );
};

export default FuneralWishes;