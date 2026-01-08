import React, { useState } from 'react';
import './FuneralWishesFormModal.css';

const FuneralWishesFormModal = ({ wish, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formError, setFormError] = useState('');
  const [dragActive, setDragActive] = useState(false);

 
  
  const [formData, setFormData] = useState({
    documentName: '',
    shortDescription: '',
    // Choice of Funeral fields
    choiceOfFuneral: '',
    // Funeral/Wake Wishes fields
    catering: '',
    choiceOfMusic: '',
    flowers: '',
    messageToAttendees: '',
    // General notes
    notes: ''
  });
   // Guard against undefined wish prop
  if (!wish) {
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

    if (!formData.documentName) {
      setFormError('Please give this document a name.');
      return;
    }

    console.log('Form submitted:', formData);
    console.log('Uploaded files:', uploadedFiles);

    if (typeof onSave === 'function') {
      try { onSave(wish.id || 'funeral-wish'); } catch (e) { console.error(e); }
    }

    onClose();
  };

  const getFormFields = () => {
    // Common fields for all forms
    const commonFields = (
      <>
        <div className="form-group">
          <label className="form-label">Give this document a name! *</label>
          <input 
            type="text" 
            name="documentName" 
            value={formData.documentName} 
            onChange={handleChange} 
            placeholder="Document name" 
            className="form-input" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Give a short description</label>
          <textarea 
            name="shortDescription" 
            value={formData.shortDescription} 
            onChange={handleChange} 
            placeholder="Brief description of this document..." 
            className="form-input" 
            rows="3" 
          />
        </div>
      </>
    );

    // Choice of Funeral specific fields
    if (wish.id === 'choice-of-funeral') {
      return (
        <>
          <div className="form-group">
            <label className="form-label">Choice of funeral</label>
            <select 
              name="choiceOfFuneral" 
              value={formData.choiceOfFuneral} 
              onChange={handleChange} 
              className="form-input"
            >
              <option value="">Select funeral type</option>
              <option value="cremation-service">Cremation service</option>
              <option value="direct-cremation">Direct cremation</option>
              <option value="burial-service">Burial service</option>
              <option value="memorial-service">Memorial service</option>
              <option value="celebration-of-life">Celebration of life</option>
              <option value="non-traditional-funeral">Non-traditional funeral</option>
              <option value="other">Other</option>
            </select>
          </div>
          {commonFields}
        </>
      );
    }

    // Funeral/Wake Wishes specific fields
    if (wish.id === 'funeral-wake-wishes') {
      return (
        <>
          <div className="form-group">
            <label className="form-label">Catering</label>
            <textarea 
              name="catering" 
              value={formData.catering} 
              onChange={handleChange} 
              placeholder="Describe your catering preferences..." 
              className="form-input" 
              rows="3" 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Choice of music</label>
            <textarea 
              name="choiceOfMusic" 
              value={formData.choiceOfMusic} 
              onChange={handleChange} 
              placeholder="List songs or music preferences..." 
              className="form-input" 
              rows="3" 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Flowers</label>
            <textarea 
              name="flowers" 
              value={formData.flowers} 
              onChange={handleChange} 
              placeholder="Describe your flower preferences..." 
              className="form-input" 
              rows="3" 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Message to attendees</label>
            <textarea 
              name="messageToAttendees" 
              value={formData.messageToAttendees} 
              onChange={handleChange} 
              placeholder="Write a message for your funeral attendees..." 
              className="form-input" 
              rows="4" 
            />
          </div>
          {commonFields}
        </>
      );
    }

    // Invitees and Miscellaneous - just common fields plus notes
    return (
      <>
        {commonFields}
        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            placeholder="Additional notes..." 
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
          <h2 className="modal-title">{wish.title}</h2>
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
                id="funeral-file-input" 
                multiple 
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
              <label htmlFor="funeral-file-input" className="btn-browse">Browse</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuneralWishesFormModal;