import React, { useState } from "react";
import "./LegalFormModal.css";

const LegalFormModal = ({ item, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("files");
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  const handleFiles = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleSubmit = () => {
    setFormError('');
    if (!files || files.length === 0) {
      setFormError('Please upload at least one file before saving.');
      return;
    }

    if (typeof onSave === 'function') {
      try { onSave(item.id || 'legal'); } catch(e) { console.error(e); }
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-large">
        <div className="modal-header">
          <h2 className="modal-title">{item.title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

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

        <div className="modal-body">
          {activeTab === "files" && (
            <>
              <label className="upload-box">
                Upload files
                <input type="file" multiple hidden onChange={handleFiles} />
              </label>

              {files.map((f, i) => (
                <div key={i} className="file-row">{f.name}</div>
              ))}
            </>
          )}

          {activeTab === "notes" && (
            <textarea
              className="notes-input"
              placeholder="Add notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          )}
        </div>

        {formError && (
          <div style={{ color: '#c53030', padding: '0 2rem', marginTop: '0.5rem' }}>{formError}</div>
        )}

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default LegalFormModal;
