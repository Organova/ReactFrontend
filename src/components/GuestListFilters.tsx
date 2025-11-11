import React from 'react';

interface GuestListFiltersProps {
    searchTerm: string;
    roleFilter: string;
    statusFilter: string;
    onSearch: (term: string) => void;
    onRoleFilter: (role: string) => void;
    onStatusFilter: (status: string) => void;
}

const GuestListFilters: React.FC<GuestListFiltersProps> = ({
                                                               searchTerm,
                                                               roleFilter,
                                                               statusFilter,
                                                               onSearch,
                                                               onRoleFilter,
                                                               onStatusFilter
                                                           }) => {
    const roles = ['Alle Rollen', 'Gast', 'VIP', 'Sponsor', 'Arbeiter'];
    const statuses = ['Alle Status', 'Zugesagt', 'Abgesagt', 'Ausstehend'];

    return (
        <div className="guest-list-filters">
            <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Nach Namen oder E-Mail suchen..."
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="filter-group">
                <select
                    value={roleFilter}
                    onChange={(e) => onRoleFilter(e.target.value)}
                    className="filter-select"
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilter(e.target.value)}
                    className="filter-select"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default GuestListFilters;