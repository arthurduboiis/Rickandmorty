import React, { useState, useEffect } from "react";
import Navbar from "../NavBar/Navbar";
import { useCookies } from "react-cookie";
import ItemCharacter from "../CharacterPage/ItemListCharacter";
import { motion } from "framer-motion";

import { auth, usersCollectionRef } from "../../utils/firebase";

export default function Favoris() {
  const [cookies, setCookie] = useCookies(["favorite"]);

  const [characters, setCharacters] = useState([]);

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
  // recupere les favoris de l'utilisateur

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
              setCharacters(data);
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
    }
  }, [user]);

  if (loading) {
    return <div className="text-3xl font-bold underline">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      {characters.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {characters.map((character) => (
            <div className="m-2" key={character.id}>
              <ItemCharacter character={character} />
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
    </motion.div>
  );
}
