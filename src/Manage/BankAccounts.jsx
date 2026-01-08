import React, { useState } from "react";
import "./BankAccounts.css";
import BankAccountsFormModal from "./BankAccountsFormModal";

const BankAccounts = ({ onBack }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { id: "current-savings", title: "Current & Savings Account(s)", icon: "current-savings", count: 0 },
    { id: "business", title: "Business Account(s)", icon: "business", count: 0 },
    { id: "trust", title: "Trust Account(s)", icon: "trust", count: 0 },
    { id: "online", title: "Online only Account(s)", icon: "online", count: 0 },
    { id: "digital-crypto", title: "Digital/Cryptocurrency Account(s)", icon: "digital-crypto", count: 0 },
    { id: "miscellaneous", title: "Miscellaneous", icon: "miscellaneous", count: 0 },
  ]);

  const handleSaveAccount = (itemId) => {
    setItems(prev => prev.map(it => it.id === itemId ? { ...it, count: (it.count || 0) + 1 } : it));
  };

  return (
    <div className="bank-accounts-page">
      <div className="page-header">
        <h1 className="page-title">Legacy Assets Memories</h1>
        <p className="breadcrumb">
          <span className="breadcrumb-link" onClick={onBack}>
            My legacy assets memories
          </span>
          <span className="breadcrumb-separator"> / </span>
          <span className="breadcrumb-current">Bank & Currency Accounts</span>
        </p>
      </div>

      <div className="bank-accounts-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="bank-card"
            onClick={() => setSelectedItem(item)}
          >
            <div className="bank-icon-cloud">
              {item.icon === "current-savings" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="16" y="20" width="32" height="24" rx="2" />
                  <path d="M16 28h32" />
                  <rect x="20" y="34" width="8" height="4" rx="1" />
                  <circle cx="40" cy="36" r="2" fill="currentColor" />
                </svg>
              )}

              {item.icon === "business" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="18" y="14" width="28" height="36" rx="2" />
                  <path d="M18 24h28M18 34h28" />
                  <rect x="28" y="40" width="8" height="10" />
                  <line x1="24" y1="18" x2="24" y2="22" />
                  <line x1="32" y1="18" x2="32" y2="22" />
                  <line x1="40" y1="18" x2="40" y2="22" />
                </svg>
              )}

              {item.icon === "trust" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="16" y="20" width="32" height="28" rx="2" />
                  <path d="M24 20v-4h16v4" />
                  <circle cx="32" cy="34" r="7" />
                  <path d="M32 27v7m-3 0h6" />
                  <rect x="26" y="42" width="12" height="2" fill="currentColor" />
                </svg>
              )}

              {item.icon === "online" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="14" y="20" width="36" height="24" rx="2" />
                  <circle cx="32" cy="32" r="6" />
                  <path d="M26 32h-8m28 0h-8" />
                  <circle cx="32" cy="32" r="2" fill="currentColor" />
                  <path d="M24 26l-4-4m24 4l4-4m-24 12l-4 4m24-4l4 4" strokeWidth="2" />
                </svg>
              )}

              {item.icon === "digital-crypto" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="32" cy="32" r="15" />
                  <path d="M32 17v30m-2-28h6c2.5 0 4 2 4 4s-1.5 4-4 4h-6m0 0h6c2.5 0 4 2 4 4s-1.5 4-4 4h-6" />
                  <line x1="28" y1="17" x2="28" y2="21" strokeWidth="2" />
                  <line x1="36" y1="17" x2="36" y2="21" strokeWidth="2" />
                  <line x1="28" y1="43" x2="28" y2="47" strokeWidth="2" />
                  <line x1="36" y1="43" x2="36" y2="47" strokeWidth="2" />
                </svg>
              )}

              {item.icon === "miscellaneous" && (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="18" y="12" width="28" height="40" rx="2" />
                  <path d="M24 22h16m-16 8h16m-16 8h12" />
                  <circle cx="24" cy="40" r="1.5" fill="currentColor" />
                  <circle cx="30" cy="40" r="1.5" fill="currentColor" />
                  <circle cx="36" cy="40" r="1.5" fill="currentColor" />
                </svg>
              )}
            </div>

            <h3 className="bank-title">{item.title}</h3>
            <span className="count-badge">{item.count || 0} documents</span>
          </div>
        ))}
      </div>

      {selectedItem && (
        <BankAccountsFormModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={handleSaveAccount}
        />
      )}
    </div>
  );
};

export default BankAccounts;