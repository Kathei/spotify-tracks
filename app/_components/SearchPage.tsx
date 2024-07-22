"use client";
import SearchBar from "./SearchBar";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { Track } from "../../types/Track";

const SearchPage = () => {
  const [query, setQuery] = useState("" as String);
  const [searchResults, setSearchResults] = useState([] as Track[]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [offSet, setOffSet] = useState(0);

  const handleSearch = async (query: String, offSet: Number = 0) => {
    try {
      console.log("query: ", query);
      if (!query && searchResults.length < 1) return; //no query and no previous search results
      if (query.length < 2 && searchResults.length < 1) return; // query is less than 2 characters and no previous search results
      if (query.length < 2) {
        // query is less than 2 characters, previous results exist
        setSearchResults([]);
        return;
      }
      setQuery(query);
      const res = await fetch(`/api/search?query=${query}&offset=${offSet}`);
      const data = await res.json();
      if (offSet === 0) {
        setSearchResults(data);
        return;
      }
      setSearchResults((prevResults: Track[]) => [...prevResults, ...data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loadMore = () => {
    if (!query) return;
    setOffSet((prev) => prev + 20);
    handleSearch(query, offSet);
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
      <SearchResult
        tracks={searchResults}
        selectTrack={selectTrack}
        loadMore={loadMore}
      />
    </div>
  );
};

export default SearchPage;
