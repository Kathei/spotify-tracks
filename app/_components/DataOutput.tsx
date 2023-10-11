interface DataOutputProps {
  name: string;
  artistName: string;
  duration: number;
  popularity: number;
  audioFeatures: {
    danceability: number;
    energy: number;
    key: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number;
  };
}

const DataOutput: React.FC<DataOutputProps> = ({
  name,
  artistName,
  duration,
  popularity,
  audioFeatures,
}) => {
  const {
    danceability,
    energy,
    key,
    mode,
    speechiness,
    acousticness,
    instrumentalness,
    liveness,
    valence,
    tempo,
  } = audioFeatures;

  const getKey = (key: number) => {
    switch (key) {
      case 0:
        return "C";
      case 1:
        return "C♯/D♭";
      case 2:
        return "D";
      case 3:
        return "D♯/E♭";
      case 4:
        return "E";
      case 5:
        return "F";
      case 6:
        return "F♯/G♭";
      case 7:
        return "G";
      case 8:
        return "G♯/A♭";
      case 9:
        return "A";
      case 10:
        return "A♯/B♭";
      case 11:
        return "B";
      default:
        return "C";
    }
  };
  const getMode = (mode: number) => {
    if (mode === 0) {
      return "minor";
    }
    return "major";
  };

  return (
    <div>
      <h2>{name}</h2>
      <h3>by {artistName}</h3>
      <p>
        Key: {getKey(key)} {getMode(mode)}
      </p>
      <p>Duration: {duration}</p>
      <p>Popularity: {popularity}</p>
      <p>Danceability: {danceability}</p>
      <p>Energy: {energy}</p>
      <p>Speechiness: {speechiness}</p>
      <p>Acousticness: {acousticness}</p>
      <p>Instrumentalness: {instrumentalness}</p>
      <p>Liveness: {liveness}</p>
      <p>Valence: {valence}</p>
      <p>Tempo: {tempo}</p>

      <p></p>
    </div>
  );
};

export default DataOutput;
