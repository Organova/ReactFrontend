import React from 'react';

interface GuestListHeaderProps {
    totalGuests: number;
    confirmedGuests: number;
    confirmationRate: number;
    onAddGuest: () => void;
    onExport: () => void;
}

const GuestListHeader: React.FC<GuestListHeaderProps> = ({
                                                             totalGuests,
                                                             confirmedGuests,
                                                             confirmationRate,
                                                             onAddGuest,
                                                             onExport
                                                         }) => {
    return (
        <div className="guest-list-header">
            <div className="header-stats">
                <div className="stat-card">
                    <span className="stat-number">{totalGuests}</span>
                    <span className="stat-label">Gäste insgesamt</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{confirmationRate}%</span>
                    <span className="stat-label">Zusagequote</span>
                </div>
            </div>

            <div className="header-actions">
                <button className="btn-secondary" onClick={onExport}>
                    <span className="icon">📊</span>
                    Liste exportieren
                </button>
                <button className="btn-primary" onClick={onAddGuest}>
                    <span className="icon">+</span>
                    Gast hinzufügen
                </button>
            </div>
        </div>
    );
};

export default GuestListHeader;