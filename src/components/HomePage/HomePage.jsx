import { useCookies } from "react-cookie";
import { useState, useEffect, useRef } from "react";
import ItemCharacter from "../CharacterPage/ItemListCharacter";

import { auth, usersCollectionRef } from "../../utils/firebase";

export default function HomePage() {
  const [favouriteCharacter, setFavouriteCharacter] = useState([]);
  const [randomCharacter, setRandomCharacter] = useState([]);
  const [cookies, setCookie] = useCookies(["favorite"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userUID, setUserUID] = useState(null);

  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        usersCollectionRef
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUser(doc.data());
              setLoading(false);
            }
          });
		  setUserUID(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const fetchDatas = async () => {
    // set loading
	setLoading(true);
    await usersCollectionRef
      .doc(userUID)
      .get()
      .then((doc) => {
		console.log(doc)
        if (doc.exists) {
          console.log(doc.data());
          const promises = doc.data().favoris.map((id) => {
            return fetch(`https://rickandmortyapi.com/api/character/${id}`)
              .then((res) => res.json())
              .catch((error) => {
                console.log(error);
              });
          });
          Promise.all(promises)
            .then((data) => {
			  setFavouriteCharacter(data);
              setLoading(false);
            })
            .catch((error) => {
              setError(error);
              setLoading(false);
            });
        }
      });
  };
  useEffect(() => {
    if (user) {
      fetchDatas();
    } else {
		setFavouriteCharacter([]);
	}
  }, [user]);

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
        const randomCharacters = data.results.filter((character, index) => {
          return randomNumbers.includes(index);
        });

        setRandomCharacter(randomCharacters);

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


  }, []);

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
                <ItemCharacter character={character} />
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
                <ItemCharacter character={character} />
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
