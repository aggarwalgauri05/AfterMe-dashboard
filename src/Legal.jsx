import React, { useState } from "react";
import "./Legal.css";
import LegalFormModal from "./LegalFormModal";

const Legal = ({ onBack }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { id: "will", title: "Will", icon: "will", count: 0 },
    { id: "lpa", title: "Lasting Power of Attorney", icon: "lpa", count: 0 },
    { id: "executor", title: "Executor(s) / Business Executor(s)", icon: "executor", count: 0 },
    { id: "employment", title: "Employment Contract", icon: "employment", count: 0 },
    { id: "probate", title: "Previous Probate (spouse or partner)", icon: "probate", count: 0 },
    { id: "misc", title: "Miscellaneous", icon: "misc", count: 0 }
  ]);

  const handleSaveLegal = (itemId) => {
    setItems(prev => prev.map(it => it.id === itemId ? { ...it, count: (it.count || 0) + 1 } : it));
  };

  return (
    <div className="legal-page">
      <div className="page-header">
        <h1 className="page-title">Legacy Assets Memories</h1>
        <p className="breadcrumb">
          <span className="breadcrumb-link" onClick={onBack}>
            My legacy assets memories
          </span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Legal</span>
        </p>
      </div>

      <div className="legal-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="legal-card"
            onClick={() => setSelectedItem(item)}
          >
            <div className="legal-icon-cloud">
              {item.icon === "will" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="18" y="10" width="28" height="40" rx="2" />
                  <line x1="24" y1="18" x2="40" y2="18" />
                  <line x1="24" y1="26" x2="40" y2="26" />
                  <text x="32" y="42" textAnchor="middle" fontSize="10">WILL</text>
                </svg>
              )}

              {item.icon === "lpa" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 8h18l10 10v38H20z" />
                  <path d="M38 8v10h10" />
                  <line x1="24" y1="32" x2="40" y2="32" />
                </svg>
              )}

              {item.icon === "executor" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="18" y="10" width="28" height="40" rx="2" />
                  <line x1="24" y1="22" x2="40" y2="22" />
                  <line x1="24" y1="30" x2="40" y2="30" />
                </svg>
              )}

              {item.icon === "employment" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 8h18l10 10v38H20z" />
                  <path d="M38 8v10h10" />
                  <path d="M24 40l6 6 10-12" />
                </svg>
              )}

              {item.icon === "probate" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="24" cy="26" r="6" />
                  <circle cx="40" cy="26" r="6" />
                  <path d="M16 42c2-6 14-6 16 0" />
                  <path d="M32 42c2-6 14-6 16 0" />
                </svg>
              )}

              {item.icon === "misc" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M24 20l16 16" />
                  <path d="M34 10l10 10" />
                  <rect x="10" y="44" width="30" height="6" />
                </svg>
              )}
            </div>

            <h3 className="legal-title">{item.title}</h3>

            <span className="count-badge">{item.count || 0} documents</span>
          </div>
        ))}
      </div>

      {selectedItem && (
        <LegalFormModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={handleSaveLegal}
        />
      )}
    </div>
  );
};

export default Legal;
