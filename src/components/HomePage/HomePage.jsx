import { useCookies } from "react-cookie";
import { useState, useEffect, useRef } from "react";
import ItemCharacter from "../CharacterPage/ItemListCharacter";

export default function HomePage() {
  const [favouriteCharacter, setFavouriteCharacter] = useState([]);
  const [randomCharacter, setRandomCharacter] = useState([]);
  const [cookies, setCookie] = useCookies(["favorite"]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => {
        // get 5 different random numbers for data.info.count
        const randomNumbers = [];
        while (randomNumbers.length < 5) {
          const random = Math.floor(Math.random() * data.info.count);
          if (!randomNumbers.includes(random)) {
            randomNumbers.push(random);
          }
        }
        fetch(
          `https://rickandmortyapi.com/api/character/${randomNumbers.join(",")}`
        )
          .then((res) => res.json())
          .then((data) => {
            setRandomCharacter(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    const favorite = cookies.favorite || [];
	//console.log(favouriteCharacter.length)
	//console.log(favorite.length)
    const string = favorite.slice(Math.max(favorite.length - 5, 0)).join(",");
	console.log(string)
    fetch(`https://rickandmortyapi.com/api/character/[${string}]`)
      .then((res) => res.json())
      .then((data) => {
		console.log(data)
        setFavouriteCharacter(data);
      })
      .catch((error) => {
        console.log(error);
      });




  }, [cookies.favorite]);

  return (
    <div className="flex flex-col sm:flex-row justify-center">
      <div className="border-4 border-yellow-500 border-opacity-50 rounded-md mx-5 md:w-1/2 w-full">
        <div>
          <h3 className="text-2xl font-bold ">Quelques personnages</h3>
        </div>
        <div className="flex flex-wrap  justify-center items-center ">
          {randomCharacter.length > 0 ? (
            randomCharacter.map((character) => (
              <div className="p-4" key={character.id}>
                <ItemCharacter characterLink={character.url} />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="border-4 border-yellow-500 border-opacity-50 rounded-md  mx-5 md:w-1/2 w-full">
        <div>
          <h3 className="text-2xl font-bold ">Mes derniers favoris</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center ">
          {favouriteCharacter.length > 0 ? (
            favouriteCharacter.map((character) => (
              <div className="p-4" key={character.id}>
                <ItemCharacter characterLink={character.url} />
              </div>
            ))
          ) : (
            <div>Pas de favoris</div>
          )}
        </div>
      </div>
    </div>
  );
}
