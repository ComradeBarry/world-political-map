import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MapControls = ({ filters, onFilterChange, options }) => {
  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
      <h3 className="text-lg font-bold mb-2">Filtres</h3>
      
      <div className="grid gap-4">
        <Select 
          value={filters.country}
          onValueChange={(value) => onFilterChange('country', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les pays</SelectItem>
            {options.countries.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.ideology}
          onValueChange={(value) => onFilterChange('ideology', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Idéologie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les idéologies</SelectItem>
            {options.ideologies.map(ideology => (
              <SelectItem key={ideology} value={ideology}>{ideology}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.period}
          onValueChange={(value) => onFilterChange('period', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les périodes</SelectItem>
            <SelectItem value="active">Partis actifs</SelectItem>
            <SelectItem value="historical">Partis historiques</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MapControls;