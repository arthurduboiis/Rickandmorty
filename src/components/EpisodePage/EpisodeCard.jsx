import ItemCharacter from "../CharacterPage/ItemListCharacter";
import { useState } from "react";

export default function EpisodeCard({ episode }) {
  return (
    <div className="flex flex-col items-center justify-center border-4 border-yellow-500 md:h-32 border-opacity-50 rounded-md  my-4 w-11/12">
      <div className="flex md:flex-row flex-col items-center w-full h-full justify-between p-2">
        <div className="flex justify-between items-center md:w-4/6 w-full">
          <h2 className="md:text-2xl lg:text-3xl font-bold p-2">{episode.name}</h2>
          <p className="md:text-2xl lg:text-3xl p-2">{episode.episode}</p>
          <p className="md:text-xl p-2">{episode.air_date}</p>
        </div>
        <div className="">
          <a
            className="bg-yellow-500 hover:bg-yellow-700 text-sm md:text-xl lg:text-3xl md:w-full font-bold py-3 px-5 rounded-full"
            href={"/episode/" + episode.id}
          >
            Afficher l'épisodes
          </a>
        </div>
      </div>
    </div>
  );
}
