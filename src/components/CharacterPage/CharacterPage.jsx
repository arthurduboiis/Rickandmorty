import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../NavBar/Navbar";

export default function Personnage() {
  let { personnageId } = useParams();

  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inEpisodes, setInEpisodes] = useState([]);
  const [location, setLocation] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${personnageId}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
        fetch(
          `https://rickandmortyapi.com/api/episode/[${character.episode.map(
            (episode) => episode.split("/").pop()
          )}]`
        )
          .then((res) => res.json())
          .then((data) => {
            setInEpisodes(data);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });

        fetch(
          `${character.location.url}`
        )
          .then((res) => res.json())
          .then((data) => {
            setLocation(data);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [personnageId, character]);

  return (
    <div>
	<Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl font-bold p-4 ">{character.name}</div>
        
        <div className="flex justify-around w-full">
          <div className="flex flex-col border-4 border-yellow-500 border-opacity-50 rounded-md items-center mx-2 w-1/5">
            <h1 className="font-bold text-xl px-4 pt-4 pb-6 border-b-2 border-yellow-500">Descriptions</h1>
			<div className="pt-2">Statut : {character.status}</div>
			<div>Type : {character.species}</div>
			<div className="pb-2">Sexe : {character.gender}</div>
          </div>
		  <img src={character.image} alt={character.name} />
          <div className="flex flex-col border-4 border-yellow-500 border-opacity-50 rounded-md  items-center mx-2 w-1/5">
            <h1 className="font-bold text-xl px-4 pt-4 pb-6 border-b-2 border-yellow-500"> Locations  </h1>
            <div className="pt-2">{location.name}</div>
            <div className="pb-2">{location.type}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="font-bold text-xl px-4 pt-4 pb-6 border-b-2 border-yellow-500" >Episodes</div>
          <div className="flex flex-col justify-center items-center pt-2">
            {inEpisodes.map((episode) => (
              <a key={episode.id} href={"/episodes"}>
                {episode.name +
                  " - " +
                  episode.episode +
                  " - " +
                  episode.air_date}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}