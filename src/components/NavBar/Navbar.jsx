import { useState } from "react";
import logo from "../../assets/rickandmorty.png";
import "../../App.css";
import { auth, usersCollectionRef } from "../../utils/firebase";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { logout } from "../../Actions/auth";
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
	loading: state.loading,
	error: state.error
  });
  
const mapDispatchToProps = (dispatch) => ({
	onSubmit: () => {
	  dispatch(logout());
	}
  });

export default connect(mapStateToProps, mapDispatchToProps)(
    function Navbar({ onSubmit, loading, error }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };


  // get current user from firebase if exists get username from doc in users collection
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
            }
          });
      } else {
        setUser(null);
      }
    });
  }, []);



  return (
    <div className="flex items-center justify-between py-4 fontRick">
      <a href="/" className="px-4 w-48 md-64 lg-70">
        <img src={logo} alt="logo" />
      </a>
      <nav className="lg:w-full">
        <section className="MOBILE-MENU flex lg:hidden">
          <button className="px-4 text-xl">
            <a href="/login">Se connecter</a>
          </button>

          <div
            className="HAMBURGER-ICON space-y-2 px-4"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li className=" my-8 px-2 uppercase text-lg">
                <a href="/">Accueil</a>
              </li>
              <li className="my-8 px-2 uppercase ">
                <a href="/favoris">Favoris</a>
              </li>
              <li className=" my-8 px-2 uppercase">
                <a href="/episodes">Épisodes</a>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden lg:flex lg:justify-between">
          <div className="lg:flex w-1/2 flex-row-reverse">
            <li className="px-4 text-xl order-1">
              <a href="/">Accueil</a>
            </li>
			{user ? ( <li className="px-4 text-xl">
              <a href="/favoris">Favoris</a>
            </li>) : null}
           
            <li className="px-4 text-xl">
              <a href="/episodes">Épisodes</a>
            </li>
          </div>

          <li className="px-4 text-xl">
            {!user ? (
              <button>
                <a href="/login">Se connecter</a>
              </button>
            ) : (
              <div onClick={handleSubmit}>
			  <FontAwesomeIcon icon={faUser} />
                <span> {user.username}</span>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <style>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: absolute;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
          background: white;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }
      `}</style>
    </div>
  );
})
