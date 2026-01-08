import React, { useState } from 'react';
import './RealEstate.css';
import RealEstateFormModal from './RealEstateFormModal';

const RealEstate = ({ onBack }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [properties, setProperties] = useState([
    {
      id: 'primary-residence',
      title: 'Primary Residence',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 28 L32 12 L52 28 L52 52 L12 52 Z" />
          <rect x="26" y="36" width="12" height="16" />
          <rect x="18" y="32" width="8" height="8" />
          <rect x="38" y="32" width="8" height="8" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'rental-property',
      title: 'Rental Property',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="18" width="32" height="34" />
          <rect x="24" y="28" width="6" height="8" />
          <rect x="34" y="28" width="6" height="8" />
          <rect x="28" y="40" width="8" height="12" />
          <path d="M12 18 L32 8 L52 18" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'commercial-property',
      title: 'Commercial Property',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="14" y="14" width="36" height="38" />
          <line x1="14" y1="24" x2="50" y2="24" />
          <line x1="14" y1="34" x2="50" y2="34" />
          <line x1="14" y1="44" x2="50" y2="44" />
          <line x1="32" y1="14" x2="32" y2="52" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'vacation-home',
      title: 'Vacation Home',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 32 L32 16 L52 32 L52 54 L12 54 Z" />
          <circle cx="20" cy="10" r="4" />
          <line x1="16" y1="12" x2="24" y2="12" />
          <rect x="26" y="40" width="12" height="14" />
          <rect x="18" y="34" width="7" height="7" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'land',
      title: 'Land / Plot',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="12" y="20" width="40" height="28" rx="2" />
          <path d="M16 36 L22 30 L30 38 L40 28 L48 36" />
          <circle cx="38" cy="26" r="2" fill="currentColor" />
        </svg>
      ),
      count: 0
    }
  ]);

  const handleSaveProperty = (propertyId) => {
    setProperties(prev => prev.map(p => p.id === propertyId ? { ...p, count: (p.count || 0) + 1 } : p));
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
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
          <span className="breadcrumb-current">Real Estate</span>
        </p>
      </div>

      <div className="devices-grid">
        {properties.map((property) => (
          <div 
            key={property.id} 
            className="device-card"
            onClick={() => handlePropertyClick(property)}
          >
            <div className="device-icon-circle">
              {property.icon}
            </div>
            <h3 className="device-title">{property.title}</h3>
            <div className="device-count">
              <span className="count-badge">{property.count} documents</span>
            </div>
          </div>
        ))}
      </div>

      {selectedProperty && (
        <RealEstateFormModal 
          property={selectedProperty}
          onClose={handleCloseModal}
          onSave={handleSaveProperty}
        />
      )}
    </div>
  );
};

export default RealEstate;