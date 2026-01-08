import React, { useState } from 'react';
import './KeyDevices.css';
import DeviceFormModal from './DeviceFormModal';

const KeyDevices = ({ onBack }) => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [devices, setDevices] = useState([
    {
      id: 'smartphone',
      title: 'Smartphone',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="20" y="8" width="24" height="48" rx="3" />
          <line x1="28" y1="50" x2="36" y2="50" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="14" x2="44" y2="14" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'personal-computer',
      title: 'Personal Computer',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="12" y="12" width="40" height="28" rx="2" />
          <line x1="12" y1="40" x2="52" y2="40" />
          <path d="M28 40 L28 48 L36 48 L36 40" />
          <line x1="22" y1="48" x2="42" y2="48" strokeWidth="2" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'tablet',
      title: 'Tablet',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="16" y="8" width="32" height="48" rx="3" />
          <circle cx="32" cy="50" r="2" fill="currentColor" />
          <line x1="16" y1="14" x2="48" y2="14" />
        </svg>
      ),
      count: 0
    },
    {
      id: 'miscellaneous',
      title: 'Miscellaneous',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="18" y="14" width="28" height="20" rx="2" />
          <circle cx="24" cy="24" r="3" />
          <circle cx="40" cy="24" r="3" />
          <path d="M20 38 Q24 42 32 42 Q40 42 44 38" strokeWidth="2" />
          <path d="M28 16 L28 12 M36 16 L36 12" strokeWidth="1.5" />
        </svg>
      ),
      count: 0
    }
  ]);

  const handleSaveDevice = (deviceId) => {
    setDevices(prev => prev.map(d => d.id === deviceId ? { ...d, count: (d.count || 0) + 1 } : d));
  };

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDevice(null);
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
          <span className="breadcrumb-current">Key Devices</span>
        </p>
      </div>

      <div className="devices-grid">
        {devices.map((device) => (
          <div 
            key={device.id} 
            className="device-card"
            onClick={() => handleDeviceClick(device)}
          >
            <div className="device-icon-circle">
              {device.icon}
            </div>
            <h3 className="device-title">{device.title}</h3>
            <div className="device-count">
              <span className="count-badge">{device.count} documents</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedDevice && (
        <DeviceFormModal 
          device={selectedDevice}
          onClose={handleCloseModal}
          onSave={handleSaveDevice}
        />
      )}
    </div>
  );
};

export default KeyDevices;