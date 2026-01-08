import React, { useState } from 'react';
import './Financials.css';
import FinancialFormModal from './FinancialFormModal';

const Financials = ({ onBack }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { id: 'bank', title: 'Bank Accounts', count: 0 },
    { id: 'investment', title: 'Investments', count: 0 },
    { id: 'pension', title: 'Pensions', count: 0 },
    { id: 'loans', title: 'Loans', count: 0 }
  ]);

  const handleSave = (id) => setItems(prev => prev.map(it => it.id === id ? { ...it, count: (it.count||0)+1 } : it));

  return (
    <div className="financials-page">
      <div className="page-header">
        <h1 className="page-title">Financials</h1>
        <p className="breadcrumb">
          <span className="breadcrumb-link" onClick={onBack} style={{ cursor: 'pointer' }}>My legacy assets memories</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Financials</span>
        </p>
      </div>

      <div className="financials-grid">
        {items.map(item => (
          <div key={item.id} className="fin-card" onClick={() => setSelectedItem(item)}>
            <div className="fin-icon">💳</div>
            <h3 className="fin-title">{item.title}</h3>
            <span className="count-badge">{item.count} documents</span>
          </div>
        ))}
      </div>

      {selectedItem && (
        <FinancialFormModal item={selectedItem} onClose={() => setSelectedItem(null)} onSave={handleSave} />
      )}
    </div>
  );
};

export default Financials;
