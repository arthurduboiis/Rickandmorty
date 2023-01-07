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
        setCharacter(data);
        cookies.favorite && cookies.favorite.includes(data.id) ? setIsInFavorite(true) : setIsInFavorite(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
     
  }, [cookies.favorite, characterLink]);

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
	<div className="w-72 sm:w-2/4 md:w-60">
	<div
	  className="
		bg-white
		shadow-md
		h-32
		w-full
		transition duration-400 ease-in-out
		hover:scale-105 hover:shadow-2xl
		overflow-hidden
		rounded-3xl
		flex flex-row overflow-hidden
		sm:flex-row sm:h-32
		sm:w-full
	  "
	>
	  <img
		className="w-1/2 sm:h-full sm:w-1/2 object-cover"
		src={character.image}
		alt={character.name}
	  />
  
	  <div
		className="
		   w-1/2
		  flex flex-col items-baseline justify-between pl-1
		  h-full sm:items-baseline sm:w-1/2
		"
	  >
		<div className="flex flex-col justify-start items-start">
		  <a href={"/personnage/" + character.id} className="text-sm font-normal mb-0 text-gray-600 font-sans p-2 underline">
			{character.name}
		  </a>
		</div>
  
		<div className="w-full flex items-center justify-end">
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
