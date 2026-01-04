import React, { useState } from 'react';
import './ContactFormModal.css';

const ContactFormModal = ({ contact, onClose }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    relationship: '',
    companyName: '',
    position: '',
    specialty: '',
    licenseNumber: '',
    membershipNumber: '',
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
    console.log('Form submitted:', formData);
    console.log('Uploaded files:', uploadedFiles);
    onClose();
  };

  const getFormFields = () => {
    switch(contact.id) {
      case 'spouse-partner':
        return (
          <>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="First Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Surname</label>
              <input 
                type="text" 
                name="surname" 
                value={formData.surname} 
                onChange={handleChange} 
                placeholder="Surname" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Telephone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="01234567890" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Address" 
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

      case 'closest-friends':
        return (
          <>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="First Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Surname</label>
              <input 
                type="text" 
                name="surname" 
                value={formData.surname} 
                onChange={handleChange} 
                placeholder="Surname" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Telephone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="01234567890" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Relationship</label>
              <input 
                type="text" 
                name="relationship" 
                value={formData.relationship} 
                onChange={handleChange} 
                placeholder="e.g., Best Friend, Childhood Friend" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Address" 
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

      case 'lawyer':
        return (
          <>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="First Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Surname</label>
              <input 
                type="text" 
                name="surname" 
                value={formData.surname} 
                onChange={handleChange} 
                placeholder="Surname" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                placeholder="Law Firm Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Specialty</label>
              <input 
                type="text" 
                name="specialty" 
                value={formData.specialty} 
                onChange={handleChange} 
                placeholder="e.g., Estate Planning, Family Law" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Telephone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="01234567890" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Office Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Office Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">License Number</label>
              <input 
                type="text" 
                name="licenseNumber" 
                value={formData.licenseNumber} 
                onChange={handleChange} 
                placeholder="License Number" 
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

      case 'accountant':
        return (
          <>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="First Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Surname</label>
              <input 
                type="text" 
                name="surname" 
                value={formData.surname} 
                onChange={handleChange} 
                placeholder="Surname" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                placeholder="Accounting Firm Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Position</label>
              <input 
                type="text" 
                name="position" 
                value={formData.position} 
                onChange={handleChange} 
                placeholder="e.g., CPA, Tax Accountant" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Telephone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="01234567890" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Office Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Office Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">License Number</label>
              <input 
                type="text" 
                name="licenseNumber" 
                value={formData.licenseNumber} 
                onChange={handleChange} 
                placeholder="Professional License Number" 
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

      case 'financial-planner':
        return (
          <>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="First Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Surname</label>
              <input 
                type="text" 
                name="surname" 
                value={formData.surname} 
                onChange={handleChange} 
                placeholder="Surname" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                placeholder="Financial Planning Firm" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Specialty</label>
              <input 
                type="text" 
                name="specialty" 
                value={formData.specialty} 
                onChange={handleChange} 
                placeholder="e.g., Retirement Planning, Investment Advisory" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Telephone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="01234567890" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Office Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Office Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Certification Number</label>
              <input 
                type="text" 
                name="licenseNumber" 
                value={formData.licenseNumber} 
                onChange={handleChange} 
                placeholder="CFP, IFA License Number" 
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

      case 'family-doctor':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Doctor's First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="First Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Doctor's Surname</label>
              <input 
                type="text" 
                name="surname" 
                value={formData.surname} 
                onChange={handleChange} 
                placeholder="Surname" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Clinic/Hospital Name</label>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                placeholder="Clinic or Hospital Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Specialty</label>
              <input 
                type="text" 
                name="specialty" 
                value={formData.specialty} 
                onChange={handleChange} 
                placeholder="e.g., General Practice, Cardiology" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Telephone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="01234567890" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Clinic Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Clinic Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Medical License Number</label>
              <input 
                type="text" 
                name="licenseNumber" 
                value={formData.licenseNumber} 
                onChange={handleChange} 
                placeholder="Medical License Number" 
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

      case 'clubs-association':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Club/Association Name</label>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                placeholder="Club or Association Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Membership Number</label>
              <input 
                type="text" 
                name="membershipNumber" 
                value={formData.membershipNumber} 
                onChange={handleChange} 
                placeholder="Membership Number" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Person Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="Contact Person Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Telephone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="01234567890" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Club Address" 
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
              <label className="form-label">Contact Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="Contact Name" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Relationship/Position</label>
              <input 
                type="text" 
                name="relationship" 
                value={formData.relationship} 
                onChange={handleChange} 
                placeholder="Relationship or Position" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email Address" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Telephone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="01234567890" 
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Address" 
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
          <h2 className="modal-title">{contact.title}</h2>
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
                id="contact-file-input" 
                multiple 
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
              <label htmlFor="contact-file-input" className="btn-browse">Browse</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactFormModal;