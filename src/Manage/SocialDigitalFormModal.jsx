import React, { useState } from 'react';
import './SocialDigitalFormModal.css';

const SocialDigitalFormModal = ({ account, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formError, setFormError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  const [formData, setFormData] = useState({
    // Social Media
    socialMediaAccount: '',
    socialMediaUsername: '',
    socialMediaPassword: '',
    socialMediaConfirmPassword: '',
    // Email
    emailPlatform: '',
    email: '',
    emailPassword: '',
    emailConfirmPassword: '',
    // Online Accounts
    url: '',
    onlineUsername: '',
    onlinePassword: '',
    onlineConfirmPassword: '',
    // Non-Digital
    vendor: '',
    nonDigitalUsername: '',
    nonDigitalPassword: '',
    nonDigitalConfirmPassword: '',
    // Common fields
    documentName: '',
    description: ''
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

    // Validate based on account type
    if (account.id === 'social-media') {
      if (!formData.socialMediaAccount) {
        setFormError('Please select a Social Media Account.');
        return;
      }
      if (!formData.socialMediaUsername) {
        setFormError('Please fill in the User Name.');
        return;
      }
      if (!formData.socialMediaPassword) {
        setFormError('Please fill in the Password.');
        return;
      }
      if (formData.socialMediaPassword !== formData.socialMediaConfirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
    } else if (account.id === 'email') {
      if (!formData.emailPlatform) {
        setFormError('Please select an Email Platform.');
        return;
      }
      if (!formData.email) {
        setFormError('Please fill in the Email.');
        return;
      }
      if (!formData.emailPassword) {
        setFormError('Please fill in the Password.');
        return;
      }
      if (formData.emailPassword !== formData.emailConfirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
    } else if (account.id === 'online-accounts') {
      if (!formData.url) {
        setFormError('Please fill in the URL.');
        return;
      }
      if (!formData.onlineUsername) {
        setFormError('Please fill in the User Name.');
        return;
      }
      if (!formData.onlinePassword) {
        setFormError('Please fill in the Password.');
        return;
      }
      if (formData.onlinePassword !== formData.onlineConfirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
    } else if (account.id === 'non-digital') {
      if (!formData.vendor) {
        setFormError('Please fill in the Vendor.');
        return;
      }
      if (!formData.nonDigitalUsername) {
        setFormError('Please fill in the User Name.');
        return;
      }
      if (!formData.nonDigitalPassword) {
        setFormError('Please fill in the Password.');
        return;
      }
      if (formData.nonDigitalPassword !== formData.nonDigitalConfirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
    }

    if (!formData.documentName) {
      setFormError('Please give this document a name.');
      return;
    }

    console.log('Form submitted:', formData);
    console.log('Uploaded files:', uploadedFiles);

    if (typeof onSave === 'function') {
      try { onSave(account.id || 'account'); } catch (e) { console.error(e); }
    }

    onClose();
  };

  const getSocialMediaFormFields = () => {
    return (
      <>
        <div className="form-group">
          <label className="form-label">Social Media Account *</label>
          <select 
            name="socialMediaAccount" 
            value={formData.socialMediaAccount} 
            onChange={handleChange} 
            className="form-input"
          >
            <option value="">Social Media Account</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter / X</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
            <option value="snapchat">Snapchat</option>
            <option value="youtube">YouTube</option>
            <option value="pinterest">Pinterest</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">User Name *</label>
          <input 
            type="text" 
            name="socialMediaUsername" 
            value={formData.socialMediaUsername} 
            onChange={handleChange} 
            placeholder="Username or Handle" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password *</label>
          <input 
            type="password" 
            name="socialMediaPassword" 
            value={formData.socialMediaPassword} 
            onChange={handleChange} 
            placeholder="Password" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirmation Password *</label>
          <input 
            type="password" 
            name="socialMediaConfirmPassword" 
            value={formData.socialMediaConfirmPassword} 
            onChange={handleChange} 
            placeholder="Confirm Password" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Give this document a name! *</label>
          <input 
            type="text" 
            name="documentName" 
            value={formData.documentName} 
            onChange={handleChange} 
            placeholder="Document Name" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Give a short description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Add a description..." 
            className="form-input" 
            rows="4" 
          />
        </div>
      </>
    );
  };

  const getEmailFormFields = () => {
    return (
      <>
        <div className="form-group">
          <label className="form-label">Email Platform *</label>
          <select 
            name="emailPlatform" 
            value={formData.emailPlatform} 
            onChange={handleChange} 
            className="form-input"
          >
            <option value="">Email Platform</option>
            <option value="gmail">Gmail</option>
            <option value="outlook">Outlook</option>
            <option value="yahoo">Yahoo Mail</option>
            <option value="icloud">iCloud Mail</option>
            <option value="protonmail">ProtonMail</option>
            <option value="aol">AOL Mail</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="email@example.com" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password *</label>
          <input 
            type="password" 
            name="emailPassword" 
            value={formData.emailPassword} 
            onChange={handleChange} 
            placeholder="Password" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirmation Password *</label>
          <input 
            type="password" 
            name="emailConfirmPassword" 
            value={formData.emailConfirmPassword} 
            onChange={handleChange} 
            placeholder="Confirm Password" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Give this document a name! *</label>
          <input 
            type="text" 
            name="documentName" 
            value={formData.documentName} 
            onChange={handleChange} 
            placeholder="Document Name" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Give a short description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Add a description..." 
            className="form-input" 
            rows="4" 
          />
        </div>
      </>
    );
  };

  const getOnlineAccountsFormFields = () => {
    return (
      <>
        <div className="form-group">
          <label className="form-label">URL *</label>
          <input 
            type="url" 
            name="url" 
            value={formData.url} 
            onChange={handleChange} 
            placeholder="https://example.com" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">User Name *</label>
          <input 
            type="text" 
            name="onlineUsername" 
            value={formData.onlineUsername} 
            onChange={handleChange} 
            placeholder="Username" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password *</label>
          <input 
            type="password" 
            name="onlinePassword" 
            value={formData.onlinePassword} 
            onChange={handleChange} 
            placeholder="Password" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirmation Password *</label>
          <input 
            type="password" 
            name="onlineConfirmPassword" 
            value={formData.onlineConfirmPassword} 
            onChange={handleChange} 
            placeholder="Confirm Password" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Give this document a name! *</label>
          <input 
            type="text" 
            name="documentName" 
            value={formData.documentName} 
            onChange={handleChange} 
            placeholder="Document Name" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Give a short description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Add a description..." 
            className="form-input" 
            rows="4" 
          />
        </div>
      </>
    );
  };

  const getNonDigitalFormFields = () => {
    return (
      <>
        <div className="form-group">
          <label className="form-label">Vendor *</label>
          <input 
            type="text" 
            name="vendor" 
            value={formData.vendor} 
            onChange={handleChange} 
            placeholder="Vendor Name" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">User Name *</label>
          <input 
            type="text" 
            name="nonDigitalUsername" 
            value={formData.nonDigitalUsername} 
            onChange={handleChange} 
            placeholder="Username" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password *</label>
          <input 
            type="password" 
            name="nonDigitalPassword" 
            value={formData.nonDigitalPassword} 
            onChange={handleChange} 
            placeholder="Password" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirmation Password *</label>
          <input 
            type="password" 
            name="nonDigitalConfirmPassword" 
            value={formData.nonDigitalConfirmPassword} 
            onChange={handleChange} 
            placeholder="Confirm Password" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Give this document a name! *</label>
          <input 
            type="text" 
            name="documentName" 
            value={formData.documentName} 
            onChange={handleChange} 
            placeholder="Document Name" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Give a short description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Add a description..." 
            className="form-input" 
            rows="4" 
          />
        </div>
      </>
    );
  };

  const getMiscellaneousFormFields = () => {
    return (
      <>
        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Write your notes here..." 
            className="form-input" 
            rows="8" 
          />
        </div>
      </>
    );
  };

  const getFormFields = () => {
    switch(account.id) {
      case 'social-media':
        return getSocialMediaFormFields();
      case 'email':
        return getEmailFormFields();
      case 'online-accounts':
        return getOnlineAccountsFormFields();
      case 'non-digital':
        return getNonDigitalFormFields();
      case 'miscellaneous':
        return getMiscellaneousFormFields();
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{account.title}</h2>
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
                id="social-digital-file-input" 
                multiple 
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
              <label htmlFor="social-digital-file-input" className="btn-browse">Browse</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialDigitalFormModal;