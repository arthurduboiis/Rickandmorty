import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Favoris from './components/BookmarkPage/Favoris';
import Episodes from './components/EpisodePage/Episodes';
import reportWebVitals from './reportWebVitals';
import Personnage from './components/CharacterPage/CharacterPage';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Errorpage from './components/Errorpage';
import EpisodePage from './components/EpisodePage/EpisodePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage/>
  },
  {
    path: "/favoris",
    element: <Favoris />
  },
  {
    path: "/episodes",
    element: <Episodes />
  },
  {
    path: "/personnage/:personnageId",
    element: <Personnage />
  },
  {
	path: "/episode/:episodeId",
	element: <EpisodePage />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
