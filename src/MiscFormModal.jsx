import React, { useState } from 'react';
import './MiscFormModal.css';

const MiscFormModal = ({ item, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formError, setFormError] = useState('');

  const handleFiles = (files) => setUploadedFiles(prev => [...prev, ...Array.from(files).map(f => ({ name: f.name, file: f }))]);
  const handleFileInput = (e) => { if (e.target.files && e.target.files[0]) handleFiles(e.target.files); };
  const removeFile = (i) => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    setFormError('');
    if (!title || !description) { setFormError('Please add title and description.'); return; }
    if (!uploadedFiles || uploadedFiles.length === 0) { setFormError('Please upload at least one file.'); return; }
    if (typeof onSave === 'function') onSave(item.id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
        <div className="modal-header"><h3>{item.title}</h3><button className="modal-close" onClick={onClose}>×</button></div>
        <div className="modal-body">
          <div className="form-group"><label>Title</label><input className="form-input" value={title} onChange={(e)=>setTitle(e.target.value)} /></div>
          <div className="form-group"><label>Description</label><textarea className="form-input" value={description} onChange={(e)=>setDescription(e.target.value)} /></div>
          <div className="form-group"><label>Files</label><input type="file" multiple onChange={handleFileInput} />{uploadedFiles.map((f,i)=>(<div className="file-row" key={i}>{f.name} <button className="file-remove" onClick={()=>removeFile(i)}>Remove</button></div>))}</div>
          {formError && <div className="form-error">{formError}</div>}
        </div>
        <div className="modal-footer"><button className="btn-secondary" onClick={onClose}>Cancel</button><button className="btn-primary" onClick={handleSubmit}>Save</button></div>
      </div>
    </div>
  );
};

export default MiscFormModal;
