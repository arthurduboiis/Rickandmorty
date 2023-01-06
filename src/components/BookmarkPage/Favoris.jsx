import React, { useState, useEffect } from "react";
import Navbar from "../NavBar/Navbar";
import { useCookies } from "react-cookie";
import ItemCharacter from "../CharacterPage/ItemListCharacter";

export default function Favoris() {
  const [cookies, setCookie] = useCookies(["favorite"]);

  const [characters, setCharacters] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const favorite = cookies.favorite || [];
    const promises = favorite.map((id) => {
      return fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });
    });
    Promise.all(promises)
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [characters, cookies.favorite]);

  if (loading) {
    return <div className="text-3xl font-bold underline">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      {characters.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {characters.map((character) => (
            <div
              className="
                        bg-white
                        shadow-md
                        h-32
                        rounded-3xl
                        flex flex-col
                        overflow-hidden
                        sm:flex-row sm:h-32 sm:w-2/4
                        md:w-60
                        m-2
                    "
            key={character.id}
            >
              <ItemCharacter characterLink={character.url} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-bold underline">
            Pas encore de favoris
          </div>
          <a href="/episodes">Aller aux épisodes</a>
        </div>
      )}
    </div>
  );
}
