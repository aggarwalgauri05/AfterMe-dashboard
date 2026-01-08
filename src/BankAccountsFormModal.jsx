import React, { useState } from "react";
import "./BankAccountsFormModal.css";

const BankAccountsFormModal = ({ item, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("files");
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...uploaded]);
  };

  const handleSubmit = () => {
    setFormError('');
    
    if (!files || files.length === 0) {
      setFormError('Please upload at least one file before saving.');
      return;
    }

    if (!notes || notes.trim() === '') {
      setFormError('Please add notes about the account.');
      return;
    }

    if (typeof onSave === 'function') {
      try { 
        onSave(item.id || 'account'); 
      } catch(e) { 
        console.error(e); 
      }
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-large">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{item.title}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          <button
            className={`tab-button ${activeTab === "files" ? "active" : ""}`}
            onClick={() => setActiveTab("files")}
          >
            Files
          </button>
          <button
            className={`tab-button ${activeTab === "notes" ? "active" : ""}`}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {activeTab === "files" && (
            <>
              <label className="upload-box">
                <span>Click to upload or drag & drop files</span>
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleFileUpload}
                />
              </label>

              {files.length > 0 && (
                <div className="uploaded-files">
                  {files.map((file, index) => (
                    <div key={index} className="file-row">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "notes" && (
            <textarea
              className="notes-input"
              placeholder="Add any important notes related to this account..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          )}
        </div>

        {/* Footer */}
        {formError && (
          <div style={{ color: '#c53030', padding: '0 2rem', marginTop: '0.5rem' }}>
            {formError}
          </div>
        )}

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankAccountsFormModal;