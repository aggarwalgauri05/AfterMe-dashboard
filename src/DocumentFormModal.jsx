import React, { useState } from 'react';
import './DocumentFormModal.css';

const DocumentFormModal = ({ document, onClose }) => {
  const [activeTab, setActiveTab] = useState('files');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  
  const [formData, setFormData] = useState({
    // Passport/ID Card fields
    surname: '',
    givenNames: '',
    nationality: '',
    dateOfBirth: '',
    placeOfBirth: '',
    issueDate: '',
    expiryDate: '',
    passportNumber: '',
    
    // Driver's License fields
    licenceNumber: '',
    placeOfIssue: '',
    licenseClass: '',
    
    // Birth Certificate fields
    fullName: '',
    registrationNumber: '',
    
    // Marriage Certificate fields
    spouseName: '',
    marriageDate: '',
    marriagePlace: '',
    certificateNumber: '',
    
    // Divorce Certificate fields
    divorceDate: '',
    courtName: '',
    caseNumber: '',
    
    // Medical Records fields
    hospitalName: '',
    doctorName: '',
    recordType: '',
    recordDate: '',
    
    // Notes
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

  // Get form fields based on document type
  const getFormFields = () => {
    switch(document.id) {
      case 'passport':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Document Type</label>
              <select name="recordType" value={formData.recordType} onChange={handleChange} className="form-input">
                <option value="">Select Type</option>
                <option value="passport">Passport</option>
                <option value="id-card">ID Card</option>
                <option value="national-id">National ID</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" name="givenNames" value={formData.givenNames} onChange={handleChange} placeholder="Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Surname</label>
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Document Number</label>
              <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} placeholder="Document Number" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Nationality</label>
              <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Place of Birth</label>
              <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} placeholder="Place of Birth" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Issue Date</label>
              <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Expiry Date</label>
              <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Issuing Authority</label>
              <input type="text" name="placeOfIssue" value={formData.placeOfIssue} onChange={handleChange} placeholder="Issuing Authority" className="form-input" />
            </div>
          </>
        );

      case 'drivers-license':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" name="givenNames" value={formData.givenNames} onChange={handleChange} placeholder="Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Surname</label>
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Expiry Date</label>
              <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Place of Issue</label>
              <input type="text" name="placeOfIssue" value={formData.placeOfIssue} onChange={handleChange} placeholder="Place of Issue" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Licence Number</label>
              <input type="text" name="licenceNumber" value={formData.licenceNumber} onChange={handleChange} placeholder="112233" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} placeholder="Address" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">License Class</label>
              <input type="text" name="licenseClass" value={formData.licenseClass} onChange={handleChange} placeholder="e.g., Class C" className="form-input" />
            </div>
          </>
        );

      case 'birth-certificate':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" name="givenNames" value={formData.givenNames} onChange={handleChange} placeholder="Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Surname</label>
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Place of Birth</label>
              <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} placeholder="Place of Birth" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Father's Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Father's Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Mother's Name</label>
              <input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} placeholder="Mother's Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Registration Number</label>
              <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Registration Number" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Registration Date</label>
              <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="form-input" />
            </div>
          </>
        );

      case 'marriage-certificate':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" name="givenNames" value={formData.givenNames} onChange={handleChange} placeholder="Your Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Your Surname</label>
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Your Surname" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Spouse Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Spouse Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Spouse Surname</label>
              <input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} placeholder="Spouse Surname" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Marriage Date</label>
              <input type="date" name="marriageDate" value={formData.marriageDate} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Place of Marriage</label>
              <input type="text" name="marriagePlace" value={formData.marriagePlace} onChange={handleChange} placeholder="Place of Marriage" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Certificate Number</label>
              <input type="text" name="certificateNumber" value={formData.certificateNumber} onChange={handleChange} placeholder="Certificate Number" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Registration Date</label>
              <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="form-input" />
            </div>
          </>
        );

      case 'divorce-certificate':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" name="givenNames" value={formData.givenNames} onChange={handleChange} placeholder="Your Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Your Surname</label>
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Your Surname" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Former Spouse Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Former Spouse Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Former Spouse Surname</label>
              <input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} placeholder="Former Spouse Surname" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Divorce Date</label>
              <input type="date" name="divorceDate" value={formData.divorceDate} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Court Name</label>
              <input type="text" name="courtName" value={formData.courtName} onChange={handleChange} placeholder="Court Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Case Number</label>
              <input type="text" name="caseNumber" value={formData.caseNumber} onChange={handleChange} placeholder="Case Number" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Decree Absolute Date</label>
              <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="form-input" />
            </div>
          </>
        );

      case 'medical-records':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Record Type</label>
              <input type="text" name="recordType" value={formData.recordType} onChange={handleChange} placeholder="e.g., Blood Test, X-Ray" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Hospital/Clinic Name</label>
              <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} placeholder="Hospital/Clinic Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Doctor Name</label>
              <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} placeholder="Doctor Name" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Record Date</label>
              <input type="date" name="recordDate" value={formData.recordDate} onChange={handleChange} className="form-input" />
            </div>
          </>
        );

      case 'miscellaneous':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Document Title</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Document Title" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Document Type</label>
              <input type="text" name="recordType" value={formData.recordType} onChange={handleChange} placeholder="Document Type" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Document Number (if any)</label>
              <input type="text" name="certificateNumber" value={formData.certificateNumber} onChange={handleChange} placeholder="Document Number" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Issue Date</label>
              <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="form-input" />
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
          <h2 className="modal-title">{document.title}</h2>
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
                id="file-input" 
                multiple 
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
              <label htmlFor="file-input" className="btn-browse">Browse</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentFormModal;