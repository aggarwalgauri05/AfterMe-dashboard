import React, { useState } from 'react';
import './RealEstateFormModal.css';

const RealEstateFormModal = ({ property, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formError, setFormError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  const [formData, setFormData] = useState({
    propertyAddress: '',
    propertyType: '',
    ownershipType: '',
    purchaseDate: '',
    purchasePrice: '',
    currentValue: '',
    mortgageProvider: '',
    mortgageAccountNumber: '',
    mortgageBalance: '',
    monthlyPayment: '',
    titleDeedNumber: '',
    landRegistryNumber: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',
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
      setFormError('Please upload at least one file before saving.');
      return;
    }

    if (!formData.propertyAddress) {
      setFormError('Please fill in the Property Address.');
      return;
    }

    console.log('Form submitted:', formData);
    console.log('Uploaded files:', uploadedFiles);

    if (typeof onSave === 'function') {
      try { onSave(property.id || 'property'); } catch (e) { console.error(e); }
    }

    onClose();
  };

  const getFormFields = () => {
    return (
      <>
        <div className="form-group">
          <label className="form-label">Property Address</label>
          <input 
            type="text" 
            name="propertyAddress" 
            value={formData.propertyAddress} 
            onChange={handleChange} 
            placeholder="Full Property Address" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Property Type</label>
          <select 
            name="propertyType" 
            value={formData.propertyType} 
            onChange={handleChange} 
            className="form-input"
          >
            <option value="">Select Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Ownership Type</label>
          <select 
            name="ownershipType" 
            value={formData.ownershipType} 
            onChange={handleChange} 
            className="form-input"
          >
            <option value="">Select Ownership</option>
            <option value="freehold">Freehold</option>
            <option value="leasehold">Leasehold</option>
            <option value="shared-ownership">Shared Ownership</option>
          </select>
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
          <label className="form-label">Purchase Price</label>
          <input 
            type="text" 
            name="purchasePrice" 
            value={formData.purchasePrice} 
            onChange={handleChange} 
            placeholder="£0.00" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Current Estimated Value</label>
          <input 
            type="text" 
            name="currentValue" 
            value={formData.currentValue} 
            onChange={handleChange} 
            placeholder="£0.00" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mortgage Provider</label>
          <input 
            type="text" 
            name="mortgageProvider" 
            value={formData.mortgageProvider} 
            onChange={handleChange} 
            placeholder="Bank/Lender Name" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mortgage Account Number</label>
          <input 
            type="text" 
            name="mortgageAccountNumber" 
            value={formData.mortgageAccountNumber} 
            onChange={handleChange} 
            placeholder="Account Number" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Outstanding Mortgage Balance</label>
          <input 
            type="text" 
            name="mortgageBalance" 
            value={formData.mortgageBalance} 
            onChange={handleChange} 
            placeholder="£0.00" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Monthly Payment</label>
          <input 
            type="text" 
            name="monthlyPayment" 
            value={formData.monthlyPayment} 
            onChange={handleChange} 
            placeholder="£0.00" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Title Deed Number</label>
          <input 
            type="text" 
            name="titleDeedNumber" 
            value={formData.titleDeedNumber} 
            onChange={handleChange} 
            placeholder="Title Deed Number" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Land Registry Number</label>
          <input 
            type="text" 
            name="landRegistryNumber" 
            value={formData.landRegistryNumber} 
            onChange={handleChange} 
            placeholder="Land Registry Number" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Insurance Provider</label>
          <input 
            type="text" 
            name="insuranceProvider" 
            value={formData.insuranceProvider} 
            onChange={handleChange} 
            placeholder="Insurance Company" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Insurance Policy Number</label>
          <input 
            type="text" 
            name="insurancePolicyNumber" 
            value={formData.insurancePolicyNumber} 
            onChange={handleChange} 
            placeholder="Policy Number" 
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
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{property.title}</h2>
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
          <button className="btn-next" onClick={handleSubmit}>Save</button>
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
                id="property-file-input" 
                multiple 
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
              <label htmlFor="property-file-input" className="btn-browse">Browse</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateFormModal;