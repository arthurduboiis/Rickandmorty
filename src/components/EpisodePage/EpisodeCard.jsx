import ItemCharacter from "../CharacterPage/ItemListCharacter";
import {useState} from "react";

export default function EpisodeCard({episode}){

    const [show, setShow] = useState(false);

    const showCharacter = () => {
        setShow(!show);
    }

    return (
        <div className="flex flex-col items-center justify-center ring-4 ring-yellow-500 ring-opacity-50 my-4 w-11/12">
            <div className="flex flex-row items-center w-full justify-between p-2">
                <h2 className="text-3xl font-bold ">
                    {episode.name}
                </h2>
                <p className="text-3xl">
                    {episode.episode}
                </p>
                <p className="text-xl ">
                    {episode.air_date}
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-3xl font-bold py-3 px-5 rounded-full"
                onClick={showCharacter}>
                Afficher les personnages
                </button>
            </div>
            
            {show && <ul className="grid grid-cols-4 grid-flow-row gap-4 mt-4"> 
            { episode.characters.map((character) => (
                    <li key={character}> <ItemCharacter characterLink={character} /></li>
                ))}
            
            </ul>
            }
            
        </div>
    );

}