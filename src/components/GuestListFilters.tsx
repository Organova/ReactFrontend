import React from "react";
import { Card, CardBody, Input, Select, SelectItem } from "@heroui/react";
import { Search } from "lucide-react";

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
    <Card className="mb-6">
      <CardBody>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            isClearable
            className="flex-1"
            placeholder="Nach Namen oder E-Mail suchen..."
            startContent={<Search className="text-default-400" size={18} />}
            value={searchTerm}
            onClear={() => onSearch("")}
            onValueChange={onSearch}
          />

          <Select
            className="w-full md:w-48"
            placeholder="Rolle wählen"
            selectedKeys={[roleFilter]}
            onChange={(e) => onRoleFilter(e.target.value)}
          >
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="w-full md:w-48"
            placeholder="Status wählen"
            selectedKeys={[statusFilter]}
            onChange={(e) => onStatusFilter(e.target.value)}
          >
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>
        </div>
      </CardBody>
    </Card>
  );
};

export default GuestListFilters;
