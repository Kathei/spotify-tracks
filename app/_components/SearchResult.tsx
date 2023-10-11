/* eslint-disable @next/next/no-img-element */
// components/SearchResult.tsx
import React from "react";

interface SearchResultProps {
  tracks: {
    name: string;
    id: string;
    artist: string;
    album: string;
    image: string;
  }[];
  selectTrack: (track: string) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ tracks, selectTrack }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tracks &&
        tracks.length > 0 &&
        tracks.map((track) => (
          <div
            key={track.id}
            className="bg-white p-4 rounded-lg shadow-lg"
            onClick={() => selectTrack(track.id)}
          >
            <img src={track.image} alt={track.name} className="w-full h-auto" />
            <h3 className="text-lg font-semibold">{track.name}</h3>
            <p className="text-gray-500">{track.artist}</p>
            <p className="text-gray-500">{track.album}</p>
          </div>
        ))}
    </div>
  );
};

export default SearchResult;
