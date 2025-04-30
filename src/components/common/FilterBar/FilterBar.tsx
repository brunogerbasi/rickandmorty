import React, { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";

export interface Filters {
    name: string;
    status: string;
    species: string;
    gender: string;
}

export interface FilterBarProps {
    filters: Filters;
    onFilterChange: (filters: Filters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState<Filters>(filters);
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);


    useEffect(() => {
        onFilterChange(localFilters);
    }, [localFilters, onFilterChange]);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        const empty: Filters = { name: "", status: "", species: "", gender: "" };
        setLocalFilters(empty);
    };

    return (
        <div className="w-full relative" ref={dropdownRef}>
            <div className="w-full p-4 bg-white flex items-center justify-between shadow">
                <h2 className="text-lg font-semibold">Filtros</h2>
                <button
                    onClick={toggleDropdown}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls="filter-dropdown"
                    className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring"
                >
                    <Filter size={24} aria-hidden="true" />
                    <span className="sr-only">Abrir opções de filtro</span>
                </button>
            </div>

            {isOpen && (
                <div
                    id="filter-dropdown"
                    role="region"
                    aria-label="Opções de filtro"
                    className="absolute z-10 w-full bg-white shadow-lg rounded-b p-4 grid grid-cols-1 sm:grid-cols-4 gap-4"
                >
                    <div>
                        <label htmlFor="filter-name" className="block text-sm font-medium">
                            Name
                        </label>
                        <input
                            id="filter-name"
                            type="text"
                            name="name"
                            value={localFilters.name}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-2 py-1 focus:outline-none focus:ring"
                            placeholder="Search by name"
                        />
                    </div>
                    <div>
                        <label htmlFor="filter-status" className="block text-sm font-medium">
                            Status
                        </label>
                        <select
                            id="filter-status"
                            name="status"
                            value={localFilters.status}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-2 py-1 focus:outline-none focus:ring"
                        >
                            <option value="">All</option>
                            <option value="Alive">Alive</option>
                            <option value="Dead">Dead</option>
                            <option value="unknown">unknown</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="filter-species" className="block text-sm font-medium">
                            Species
                        </label>
                        <input
                            id="filter-species"
                            type="text"
                            name="species"
                            value={localFilters.species}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-2 py-1 focus:outline-none focus:ring"
                            placeholder="Search by species"
                        />
                    </div>
                    <div>
                        <label htmlFor="filter-gender" className="block text-sm font-medium">
                            Gender
                        </label>
                        <select
                            id="filter-gender"
                            name="gender"
                            value={localFilters.gender}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-2 py-1 focus:outline-none focus:ring"
                        >
                            <option value="">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Genderless">Genderless</option>
                            <option value="unknown">unknown</option>
                        </select>
                    </div>                   
                    <div className="sm:col-span-4 flex justify-end">
                        <button
                            onClick={clearFilters}
                            className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBar;


