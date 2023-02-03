import React, { useState } from "react";
import Navbar from "./NavBar/Navbar";
import { motion } from "framer-motion";

import { register  } from '../Actions/auth';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error,
  auth: state.auth
});



const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, email, password) => {
    dispatch(register(username, email, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(

function RegisterForm ({ onSubmit, loading, error }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorRegister, setErrorRegister] = useState(false);
  const navigate = useNavigate();
  function validateEmail(mail) 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
	{
	  return (true)
	}
	  return (false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
	if(password.length >= 8 && validateEmail(email)) {
		setErrorRegister(false)
		
    	onSubmit(username, email, password);
		navigate('/')
		
	} else {
		setErrorRegister("Champs invalide")
	}
  };

  return (
    <motion.div initial={{ opacity: 0 }}
	animate={{ opacity: 1 }}
	exit={{ opacity: 0 }}>
      <Navbar />
      <div className="flex justify-center w-full mt-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center p-6 rounded-lg shadow-md lg:w-1/3 mx-4"
        >
          <label className="block font-medium mb-2 w-full justify-items-center " >
            Username:
            <input
              className="form-input rounded-md mt-1 block w-full px-3 py-2"
              type="text"
			  aria-label="username"
			  id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="block font-medium mb-2 w-full" >
            Email:
            <input
              className="form-input rounded-md mt-1 block w-full px-3 py-2"
              type="email"
			  aria-label="emailuser"
			  id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block font-medium mb-2 w-full" >
            Password:
            <input
              className="form-input rounded-md mt-1 block w-full px-3 py-2"
              type="password"
			  aria-label="password"
			  id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="flex items-center justify-between">
            {loading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-center text-red-600">{error.message}</p>}
			{errorRegister && <p className="text-center text-red-600">{errorRegister}</p>}
          </div>
          <button
            className="mt-4 py-2 px-4 rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
            type="submit"
          >
            Register
          </button>
		  <span className="w-full mt-2"> Vous avez déjà un compte ? <a href="/login" className="underline text-blue-600">Se connecter </a></span>
        </form>
      </div>
    </motion.div>
  );
})

//export default RegisterForm;