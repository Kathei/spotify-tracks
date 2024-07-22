/* eslint-disable @next/next/no-img-element */
// components/SearchResult.tsx
import React from "react";
import Button from "./Button";
import { Track } from "../../types/Track";

interface SearchResultProps {
  tracks: Track[];
  selectTrack: (track: string) => void;
  loadMore: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  tracks,
  selectTrack,
  loadMore,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 text-black">
      {tracks &&
        tracks.length > 0 &&
        tracks.map((track) => (
          <div
            key={track.id}
            className="bg-white p-4 rounded-lg shadow-lg"
            onClick={() => selectTrack(track.id)}
          >
            {track.imageUrl && (
              <img
                src={track.imageUrl}
                alt={track.name}
                className="w-full h-auto"
              />
            )}
            <h3 className="text-lg font-semibold">{track.name}</h3>
            <p className="text-gray-500">
              {track?.artists?.map((artist) => artist).join(", ")}
            </p>
            <p className="text-gray-500">{track.albumName}</p>
          </div>
        ))}
      <Button onClick={loadMore}>Load more</Button>
    </div>
  );
};

export default SearchResult;
