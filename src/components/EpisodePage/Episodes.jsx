import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from "../NavBar/Navbar";
import EpisodeCard from "./EpisodeCard";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

export default function Episodes() {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/episode")
            .then((res) => res.json())
            .then((data) => {
                setEpisodes(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-3xl font-bold underline">Loading...</div>;
    }

    if (error) {
        return <div className="text-3xl font-bold underline">Error!</div>;
    }

    const next = async (episodeNextLink) => {
        setLoading(true)
        fetch(episodeNextLink)
            .then((res) => res.json())
            .then((data) => {
                setEpisodes(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setError(error);
                setLoading(false);
            });
    }

    const prev = async (episodePrevLink) => {
        setLoading(true)
        fetch(episodePrevLink)
            .then((res) => res.json())
            .then((data) => {
                setEpisodes(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setError(error);
                setLoading(false);
            });
    }


    return (
        <div>
            <Navbar/>
       
            <div className="flex flex-col items-center justify-center fontRick">
            
                <h1 className="text-5xl font-bold underline">Épisodes</h1>
                <div className="flex flex-col items-center justify-center py-4 w-full">
                    {episodes.results.map((episode) => (
                        <EpisodeCard key={episode.id} episode={episode} />
                    ))}
                </div>

                <div className="pb-4">
                    <button className="px-10 "
                    onClick={() => episodes.info.prev ? prev(episodes.info.prev) : console.log("no more episode")}>
                        <FontAwesomeIcon icon={faCaretLeft} className="sm:text-3xl md:text-6xl"/>
                    </button>
                    <button className="px-10"
                    onClick={() => episodes.info.next ? next(episodes.info.next) : console.log("no more episode")}>
                        <FontAwesomeIcon icon={faCaretRight} className="sm:text-3xl md:text-6xl"/>
                    </button>
                    
                </div>
            </div>
        </div>
    );
}
