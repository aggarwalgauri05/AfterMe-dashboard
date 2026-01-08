import React, { useState } from 'react';
import './TaxFormModal.css';

const TaxFormModal = ({ tax, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formError, setFormError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  const [formData, setFormData] = useState({
    taxYear: '',
    taxAuthority: '',
    taxReference: '',
    accountantName: '',
    accountantEmail: '',
    accountantPhone: '',
    filingDeadline: '',
    taxStatus: '',
    totalTaxPaid: '',
    refundAmount: '',
    notes: ''
  });

  // Safety check
  if (!tax) {
    return null;
  }

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

    if (!formData.taxYear) {
      setFormError('Please fill in the Tax Year.');
      return;
    }

    console.log('Form submitted:', formData);
    console.log('Uploaded files:', uploadedFiles);

    if (typeof onSave === 'function') {
      try { onSave(tax.id || 'tax'); } catch (e) { console.error(e); }
    }

    onClose();
  };

  const getFormFields = () => {
    return (
      <>
        <div className="form-group">
          <label className="form-label">Tax Year</label>
          <input 
            type="text" 
            name="taxYear" 
            value={formData.taxYear} 
            onChange={handleChange} 
            placeholder="e.g., 2023-2024" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Tax Authority</label>
          <input 
            type="text" 
            name="taxAuthority" 
            value={formData.taxAuthority} 
            onChange={handleChange} 
            placeholder="e.g., HMRC, IRS" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Tax Reference Number</label>
          <input 
            type="text" 
            name="taxReference" 
            value={formData.taxReference} 
            onChange={handleChange} 
            placeholder="Tax Reference Number" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Accountant/Advisor Name</label>
          <input 
            type="text" 
            name="accountantName" 
            value={formData.accountantName} 
            onChange={handleChange} 
            placeholder="Accountant Name" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Accountant Email</label>
          <input 
            type="email" 
            name="accountantEmail" 
            value={formData.accountantEmail} 
            onChange={handleChange} 
            placeholder="accountant@email.com" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Accountant Phone</label>
          <input 
            type="tel" 
            name="accountantPhone" 
            value={formData.accountantPhone} 
            onChange={handleChange} 
            placeholder="Phone Number" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Filing Deadline</label>
          <input 
            type="date" 
            name="filingDeadline" 
            value={formData.filingDeadline} 
            onChange={handleChange} 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Tax Status</label>
          <select 
            name="taxStatus" 
            value={formData.taxStatus} 
            onChange={handleChange} 
            className="form-input"
          >
            <option value="">Select Status</option>
            <option value="filed">Filed</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Total Tax Paid</label>
          <input 
            type="text" 
            name="totalTaxPaid" 
            value={formData.totalTaxPaid} 
            onChange={handleChange} 
            placeholder="£0.00" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Refund Amount (if any)</label>
          <input 
            type="text" 
            name="refundAmount" 
            value={formData.refundAmount} 
            onChange={handleChange} 
            placeholder="£0.00" 
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
          <h2 className="modal-title">{tax.title}</h2>
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
                id="tax-file-input" 
                multiple 
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
              <label htmlFor="tax-file-input" className="btn-browse">Browse</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxFormModal;