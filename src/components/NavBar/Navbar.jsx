import { useState } from "react";
import logo from "../../assets/rickandmorty.png";
import "../../App.css"

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false); 

    return (
      <div className="flex items-center justify-between py-4 fontRick">
        <a href="/" className="px-4 w-48 md-64 lg-70">
          <img src={logo} alt="logo" />
        </a>
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
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
  
          <ul className="DESKTOP-MENU hidden lg:flex">
            <li className="px-4 text-xl">
              <a href="/">Accueil</a>
            </li>
            <li className="px-4 text-xl">
              <a href="/favoris">Favoris</a>
            </li>
            <li className="px-4 text-xl">
              <a href="/episodes">Épisodes</a>
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
}
