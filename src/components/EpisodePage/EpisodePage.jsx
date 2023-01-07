import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCharacter from "../CharacterPage/ItemListCharacter";
import Navbar from "../NavBar/Navbar";

export default function EpisodePage() {
  let { episodeId } = useParams();

  const [episode, setEpisode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then((res) => res.json())
      .then((data) => {
        setEpisode(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [episodeId]);

  if (loading) {
    return <div className="text-3xl font-bold underline">Loading...</div>;
  }

  if (error) {
    return <div className="text-3xl font-bold underline">Error!</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-4 w-full">
        <div className="flex flex-col items-center justify-center border-4 border-yellow-500 border-opacity-50 rounded-md  my-4 w-11/12">
          <div className="flex flex-row items-center w-full justify-between p-2">
            <h2 className="md:text-2xl lg:text-3xl font-bold p-2">
              {episode.name}
            </h2>
            <p className="md:text-2xl lg:text-3xl p-2">{episode.episode}</p>
            <p className="md:text-xl p-2">{episode.air_date}</p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row lg:gap-4 md:gap-20 gap-4 mt-4">
            {episode.characters.map((character) => (
              <li key={character}>
                {" "}
                <ItemCharacter characterLink={character} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
