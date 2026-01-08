import React, { useState } from "react";
import "./Trusts.css";
import TrustsFormModal from "./TrustsFormModal";

const Trusts = ({ onBack }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { id: "assets", title: "Assets", icon: "assets", count: 0 },
    { id: "trustees", title: "Trustee(s)", icon: "trustees", count: 0 },
    { id: "letter", title: "Letter of Wishes", icon: "letter", count: 0 },
    { id: "misc", title: "Miscellaneous", icon: "misc", count: 0 },
  ]);

  const handleSaveTrust = (itemId) => {
    setItems(prev => prev.map(it => it.id === itemId ? { ...it, count: (it.count || 0) + 1 } : it));
  };

  return (
    <div className="trusts-page">
      <div className="page-header">
        <h1 className="page-title">Legacy Assets Memories</h1>
        <p className="breadcrumb">
          <span className="breadcrumb-link" onClick={onBack}>
            My legacy assets memories
          </span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Trusts</span>
        </p>
      </div>

      <div className="trusts-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="trusts-card"
            onClick={() => setSelectedItem(item)}
          >
            <div className="trusts-icon-cloud">
              {item.icon === "assets" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="32" cy="22" r="6" />
                  <path d="M18 42c2-8 28-8 30 0" />
                  <rect x="18" y="10" width="8" height="8" />
                  <rect x="38" y="10" width="8" height="8" />
                </svg>
              )}

              {item.icon === "trustees" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="20" cy="26" r="5" />
                  <circle cx="32" cy="26" r="5" />
                  <circle cx="44" cy="26" r="5" />
                  <path d="M14 42c2-6 12-6 14 0" />
                  <path d="M26 42c2-6 12-6 14 0" />
                </svg>
              )}

              {item.icon === "letter" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="14" y="18" width="36" height="28" rx="2" />
                  <path d="M14 18l18 14 18-14" />
                </svg>
              )}

              {item.icon === "misc" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="18" y="12" width="28" height="36" rx="2" />
                  <line x1="22" y1="22" x2="42" y2="22" />
                  <line x1="22" y1="30" x2="42" y2="30" />
                </svg>
              )}
            </div>

            <h3 className="trusts-title">{item.title}</h3>
            <span className="count-badge">{item.count || 0} documents</span>
          </div>
        ))}
      </div>

      {selectedItem && (
        <TrustsFormModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={handleSaveTrust}
        />
      )}
    </div>
  );
};

export default Trusts;
