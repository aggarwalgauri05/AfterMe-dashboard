import React, { useState } from 'react';
import './Miscellaneous.css';
import MiscFormModal from './MiscFormModal';

const Miscellaneous = ({ onBack }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { id: 'misc', title: 'Miscellaneous', count: 0 }
  ]);

  const handleSave = (id) => setItems(prev => prev.map(it => it.id === id ? { ...it, count: (it.count||0)+1 } : it));

  return (
    <div className="misc-page">
      <div className="page-header">
        <h1 className="page-title">Miscellaneous</h1>
        <p className="breadcrumb">
          <span className="breadcrumb-link" onClick={onBack} style={{ cursor: 'pointer' }}>My legacy assets memories</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Miscellaneous</span>
        </p>
      </div>

      <div className="misc-grid">
        {items.map(item => (
          <div key={item.id} className="misc-card" onClick={() => setSelectedItem(item)}>
            <div className="misc-icon">📁</div>
            <h3 className="misc-title">{item.title}</h3>
            <span className="count-badge">{item.count} documents</span>
          </div>
        ))}
      </div>

      {selectedItem && (
        <MiscFormModal item={selectedItem} onClose={() => setSelectedItem(null)} onSave={handleSave} />
      )}
    </div>
  );
};

export default Miscellaneous;
