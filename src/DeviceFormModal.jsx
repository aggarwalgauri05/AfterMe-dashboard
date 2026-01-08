import React, { useState } from 'react';
import './DeviceFormModal.css';

const DeviceFormModal = ({ device, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formError, setFormError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  const [formData, setFormData] = useState({
    deviceName: '',
    deviceModel: '',
    serialNumber: '',
    purchaseDate: '',
    manufacturer: '',
    operatingSystem: '',
    storageCapacity: '',
    password: '',
    pinCode: '',
    unlockPattern: '',
    accountEmail: '',
    accountPassword: '',
    imeiNumber: '',
    phoneNumber: '',
    carrier: '',
    processorType: '',
    ramSize: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type,
      file: file
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
    setShowUploadModal(false);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setFormError('');

    if (!uploadedFiles || uploadedFiles.length === 0) {
      setFormError('Please upload at least one file for this device before saving.');
      return;
    }

    if (!formData.deviceName || !formData.serialNumber) {
      setFormError('Please fill Device Name and Serial Number.');
      return;
    }

    console.log('Form submitted:', formData);
    console.log('Uploaded files:', uploadedFiles);

    if (typeof onSave === 'function') {
      try { onSave(device.id || 'device'); } catch (e) { console.error(e); }
    }

    onClose();
  };

  const getFormFields = () => {
    switch(device.id) {
      case 'smartphone':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Device Name</label>
              <input 
                type="text" 
                name="deviceName" 
                value={formData.deviceName} 
                onChange={handleChange} 
                placeholder="e.g., iPhone 15 Pro" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Manufacturer</label>
              <input 
                type="text" 
                name="manufacturer" 
                value={formData.manufacturer} 
                onChange={handleChange} 
                placeholder="e.g., Apple, Samsung" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Device Model</label>
              <input 
                type="text" 
                name="deviceModel" 
                value={formData.deviceModel} 
                onChange={handleChange} 
                placeholder="Model Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Serial Number</label>
              <input 
                type="text" 
                name="serialNumber" 
                value={formData.serialNumber} 
                onChange={handleChange} 
                placeholder="Serial Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">IMEI Number</label>
              <input 
                type="text" 
                name="imeiNumber" 
                value={formData.imeiNumber} 
                onChange={handleChange} 
                placeholder="IMEI Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
                placeholder="Phone Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Carrier/Network Provider</label>
              <input 
                type="text" 
                name="carrier" 
                value={formData.carrier} 
                onChange={handleChange} 
                placeholder="e.g., Verizon, AT&T" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Operating System</label>
              <input 
                type="text" 
                name="operatingSystem" 
                value={formData.operatingSystem} 
                onChange={handleChange} 
                placeholder="e.g., iOS 17, Android 14" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Storage Capacity</label>
              <input 
                type="text" 
                name="storageCapacity" 
                value={formData.storageCapacity} 
                onChange={handleChange} 
                placeholder="e.g., 256GB, 512GB" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Device Password/PIN</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Device Password or PIN" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Unlock Pattern (if applicable)</label>
              <input 
                type="text" 
                name="unlockPattern" 
                value={formData.unlockPattern} 
                onChange={handleChange} 
                placeholder="Describe unlock pattern" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Associated Account Email</label>
              <input 
                type="email" 
                name="accountEmail" 
                value={formData.accountEmail} 
                onChange={handleChange} 
                placeholder="Apple ID / Google Account" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Account Password</label>
              <input 
                type="password" 
                name="accountPassword" 
                value={formData.accountPassword} 
                onChange={handleChange} 
                placeholder="Account Password" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Purchase Date</label>
              <input 
                type="date" 
                name="purchaseDate" 
                value={formData.purchaseDate} 
                onChange={handleChange} 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                placeholder="write your notes here..." 
                className="form-input" 
                rows="4" 
              />
            </div>
          </>
        );

      case 'personal-computer':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Device Name</label>
              <input 
                type="text" 
                name="deviceName" 
                value={formData.deviceName} 
                onChange={handleChange} 
                placeholder="e.g., MacBook Pro, Dell XPS" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Manufacturer</label>
              <input 
                type="text" 
                name="manufacturer" 
                value={formData.manufacturer} 
                onChange={handleChange} 
                placeholder="e.g., Apple, Dell, HP, Lenovo" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Device Model</label>
              <input 
                type="text" 
                name="deviceModel" 
                value={formData.deviceModel} 
                onChange={handleChange} 
                placeholder="Model Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Serial Number</label>
              <input 
                type="text" 
                name="serialNumber" 
                value={formData.serialNumber} 
                onChange={handleChange} 
                placeholder="Serial Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Operating System</label>
              <input 
                type="text" 
                name="operatingSystem" 
                value={formData.operatingSystem} 
                onChange={handleChange} 
                placeholder="e.g., macOS, Windows 11, Linux" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Processor Type</label>
              <input 
                type="text" 
                name="processorType" 
                value={formData.processorType} 
                onChange={handleChange} 
                placeholder="e.g., M3, Intel Core i7, AMD Ryzen" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">RAM Size</label>
              <input 
                type="text" 
                name="ramSize" 
                value={formData.ramSize} 
                onChange={handleChange} 
                placeholder="e.g., 16GB, 32GB" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Storage Capacity</label>
              <input 
                type="text" 
                name="storageCapacity" 
                value={formData.storageCapacity} 
                onChange={handleChange} 
                placeholder="e.g., 512GB SSD, 1TB HDD" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Login Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Computer Login Password" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">PIN Code (if applicable)</label>
              <input 
                type="text" 
                name="pinCode" 
                value={formData.pinCode} 
                onChange={handleChange} 
                placeholder="PIN Code" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Associated Account Email</label>
              <input 
                type="email" 
                name="accountEmail" 
                value={formData.accountEmail} 
                onChange={handleChange} 
                placeholder="Microsoft/Apple Account Email" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Account Password</label>
              <input 
                type="password" 
                name="accountPassword" 
                value={formData.accountPassword} 
                onChange={handleChange} 
                placeholder="Account Password" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Purchase Date</label>
              <input 
                type="date" 
                name="purchaseDate" 
                value={formData.purchaseDate} 
                onChange={handleChange} 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                placeholder="write your notes here..." 
                className="form-input" 
                rows="4" 
              />
            </div>
          </>
        );

      case 'tablet':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Device Name</label>
              <input 
                type="text" 
                name="deviceName" 
                value={formData.deviceName} 
                onChange={handleChange} 
                placeholder="e.g., iPad Pro, Samsung Galaxy Tab" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Manufacturer</label>
              <input 
                type="text" 
                name="manufacturer" 
                value={formData.manufacturer} 
                onChange={handleChange} 
                placeholder="e.g., Apple, Samsung" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Device Model</label>
              <input 
                type="text" 
                name="deviceModel" 
                value={formData.deviceModel} 
                onChange={handleChange} 
                placeholder="Model Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Serial Number</label>
              <input 
                type="text" 
                name="serialNumber" 
                value={formData.serialNumber} 
                onChange={handleChange} 
                placeholder="Serial Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Operating System</label>
              <input 
                type="text" 
                name="operatingSystem" 
                value={formData.operatingSystem} 
                onChange={handleChange} 
                placeholder="e.g., iPadOS, Android" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Storage Capacity</label>
              <input 
                type="text" 
                name="storageCapacity" 
                value={formData.storageCapacity} 
                onChange={handleChange} 
                placeholder="e.g., 128GB, 256GB" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Device Password/PIN</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Device Password or PIN" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Associated Account Email</label>
              <input 
                type="email" 
                name="accountEmail" 
                value={formData.accountEmail} 
                onChange={handleChange} 
                placeholder="Apple ID / Google Account" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Account Password</label>
              <input 
                type="password" 
                name="accountPassword" 
                value={formData.accountPassword} 
                onChange={handleChange} 
                placeholder="Account Password" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Purchase Date</label>
              <input 
                type="date" 
                name="purchaseDate" 
                value={formData.purchaseDate} 
                onChange={handleChange} 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                placeholder="write your notes here..." 
                className="form-input" 
                rows="4" 
              />
            </div>
          </>
        );

      case 'miscellaneous':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Device Name</label>
              <input 
                type="text" 
                name="deviceName" 
                value={formData.deviceName} 
                onChange={handleChange} 
                placeholder="Device Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Device Type</label>
              <input 
                type="text" 
                name="manufacturer" 
                value={formData.manufacturer} 
                onChange={handleChange} 
                placeholder="e.g., Smart Watch, E-Reader, Gaming Console" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Device Model</label>
              <input 
                type="text" 
                name="deviceModel" 
                value={formData.deviceModel} 
                onChange={handleChange} 
                placeholder="Model Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Serial Number</label>
              <input 
                type="text" 
                name="serialNumber" 
                value={formData.serialNumber} 
                onChange={handleChange} 
                placeholder="Serial Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password/PIN</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Device Password or PIN" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Associated Account Email</label>
              <input 
                type="email" 
                name="accountEmail" 
                value={formData.accountEmail} 
                onChange={handleChange} 
                placeholder="Associated Account Email" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Account Password</label>
              <input 
                type="password" 
                name="accountPassword" 
                value={formData.accountPassword} 
                onChange={handleChange} 
                placeholder="Account Password" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Purchase Date</label>
              <input 
                type="date" 
                name="purchaseDate" 
                value={formData.purchaseDate} 
                onChange={handleChange} 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                placeholder="write your notes here..." 
                className="form-input" 
                rows="4" 
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{device.title}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-button ${activeTab === 'files' ? 'active' : ''}`}
            onClick={() => setActiveTab('files')}
          >
            Files
            <span className="add-icon-tab" onClick={(e) => {
              e.stopPropagation();
              setShowUploadModal(true);
            }}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2"/>
                <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="2"/>
              </svg>
            </span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'files' && (
            <div className="files-section">
              {uploadedFiles.length > 0 ? (
                <div className="uploaded-files-list">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="file-item">
                      <div className="file-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                          <polyline points="13 2 13 9 20 9"/>
                        </svg>
                      </div>
                      <div className="file-info">
                        <div className="file-name">{file.name}</div>
                        <div className="file-size">{file.size}</div>
                      </div>
                      <button className="file-remove" onClick={() => removeFile(index)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-files-message">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                    <polyline points="13 2 13 9 20 9"/>
                  </svg>
                  <p>No files uploaded yet</p>
                  <button className="upload-btn-inline" onClick={() => setShowUploadModal(true)}>
                    Upload File
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="notes-section">
              {getFormFields()}
            </div>
          )}
        </div>

        {formError && (
          <div style={{ color: '#c53030', padding: '0 2rem', marginTop: '0.5rem' }}>{formError}</div>
        )}

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-next" onClick={handleSubmit}>Next</button>
        </div>
      </div>

      {showUploadModal && (
        <div className="upload-modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="upload-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="upload-modal-header">
              <h3>Upload File</h3>
              <button className="modal-close" onClick={() => setShowUploadModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div 
              className={`upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p>Drag a file here or browse for a file to upload</p>
            </div>

            <div className="upload-modal-footer">
              <input 
                type="file" 
                id="device-file-input" 
                multiple 
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
              <label htmlFor="device-file-input" className="btn-browse">Browse</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceFormModal;