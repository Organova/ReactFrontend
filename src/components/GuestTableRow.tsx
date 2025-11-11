import React from 'react';
import { Guest } from '@/types/guest';

interface GuestTableRowProps {
    guest: Guest;
    onRemove: () => void;
}

const GuestTableRow: React.FC<GuestTableRowProps> = ({ guest, onRemove }) => {
    const getRoleBadgeClass = (rolle: string) => {
        const roleClasses: { [key: string]: string } = {
            Gast: 'badge-guest',
            VIP: 'badge-vip',
            Sponsor: 'badge-sponsor',
            Presenter: 'badge-presenter',
            Arbeiter: 'badge-team'
        };
        return `role-badge ${roleClasses[rolle] || 'badge-guest'}`;
    };

    const getStatusBadgeClass = (status: string) => {
        const statusClasses: { [key: string]: string } = {
            Zugesagt: 'status-confirmed',
            Abgesagt: 'status-declined',
            Ausstehend: 'status-pending'
        };
        return `status-badge ${statusClasses[status] || 'status-pending'}`;
    };

    return (
        <tr className="guest-row">
            <td>{guest.vorname}</td>
            <td>{guest.nachname}</td>
            <td className="email-cell">{guest.email}</td>
            <td>
                <span className={getRoleBadgeClass(guest.rolle)}>{guest.rolle}</span>
            </td>
            <td>
                <span className={getStatusBadgeClass(guest.status)}>{guest.status}</span>
            </td>
            <td>
                <button className="btn-remove" onClick={onRemove} title="Gast entfernen">
                    X
                </button>
            </td>
        </tr>
    );
};

export default GuestTableRow;