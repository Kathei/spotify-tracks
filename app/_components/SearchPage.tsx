// pages/route.ts
"use client";
import { NextRequest } from "next/server";
import SearchBar from "./SearchBar";
import { useState } from "react";
import SearchResult from "./SearchResult";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query: String) => {
    console.log("query: ", query);
    if (!query) return;
    if (query.length < 2) return;
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setSearchResults(data);
  };

  const selectTrack = async (track: string) => {
    console.log("track: ", track);
    const res = await fetch(`/api/search/${track}`);
    const data = await res.json();
    console.log("track data: ", data);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResult tracks={searchResults} selectTrack={selectTrack} />
    </div>
  );
};

export default SearchPage;
