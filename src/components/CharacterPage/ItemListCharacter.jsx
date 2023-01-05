import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useCookies } from "react-cookie";

export default function ItemCharacter({ characterLink }) {
  const [character, setCharacter] = useState();
  const [loading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["favorite"]);
  const [isInFavorite, setIsInFavorite] = useState(false);

  useEffect(() => {
    fetch(characterLink)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCharacter(data);
        cookies.favorite && cookies.favorite.includes(data.id) ? setIsInFavorite(true) : setIsInFavorite(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
     
  }, []);

  if (loading) {
    return <div className="text-3xl font-bold underline">Loading...</div>;
  }
  const addToFavorite = (id) => {
    const favorite = cookies.favorite || [];
    if(favorite.includes(id)) {
      favorite.splice(favorite.indexOf(id), 1)
      setIsInFavorite(false);
    }
    else {
      setIsInFavorite(true);
      favorite.push(id);
    }
    
    setCookie("favorite", favorite, { path: "/" });
  }

  return (
    <div className="p-2">
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
        "
      >
        <img
          className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
          src={character.image}
          alt={character.name}
        />

        <div
          className="
            flex-1
            w-full
            flex flex-col
            items-baseline
            justify-around
            h-1/2
            pl-6
            sm:h-full sm:items-baseline sm:w-1/2
          "
        >
          <div className="flex flex-col justify-start items-baseline">
            <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
              {character.name}
            </h1>
          </div>

          <div className="w-full flex justify-between items-center">
            <button
              className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => addToFavorite(character.id)}
            >
             { isInFavorite ? <FontAwesomeIcon icon={faHeart} />
             : <FontAwesomeIcon icon={faHeartRegular} />
             }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
