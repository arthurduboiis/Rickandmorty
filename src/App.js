
import { useEffect, useState } from 'react';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/NavBar/Navbar';
import soucoupe from './assets/soucoupe.png';



function App() {
	const [position, setPosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
	  function handleMouseMove(event) {
		setPosition({
		  x: event.clientX,
		  y: event.clientY
		})
	  }
  
	  window.addEventListener('mousemove', handleMouseMove)
	  return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

  return (
    <div className="App">
<div
      style={{
        position: 'absolute',
		width: '50px',
		height: '50px',
		backgroundImage: `url(${soucoupe})`,
		backgroundSize: 'cover',
        left: position.x + 2,
        top: position.y + 2,
      }}
    />
   
    <Navbar/>
    <HomePage/>

    </div>
  );
}

export default App;
