// components/SearchBar.tsx
"use client";
import { ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    if (value.length < 2) return;
    onSearch(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for tracks..."
        className="border rounded-lg p-2 pl-10 w-full text-black"
        onChange={handleInputChange}
      />
      <span className="absolute top-2 left-3 text-gray-400">🔍</span>
    </div>
  );
};

export default SearchBar;
