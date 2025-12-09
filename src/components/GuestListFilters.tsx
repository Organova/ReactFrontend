import React from "react";

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
  onStatusFilter,
}) => {
  const roles = ["Alle Rollen", "Gast", "VIP", "Sponsor", "Arbeiter"];
  const statuses = ["Alle Status", "Zugesagt", "Abgesagt", "Ausstehend"];

  return (
    <div className="guest-list-filters">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          placeholder="Nach Namen oder E-Mail suchen..."
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <select
          className="filter-select"
          value={roleFilter}
          onChange={(e) => onRoleFilter(e.target.value)}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => onStatusFilter(e.target.value)}
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
