import React, { useState } from "react";
import NavBar from "./NavBar/Navbar";
import { motion } from "framer-motion";

import { login } from '../Actions/auth';
import { connect } from 'react-redux';

import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (email, password) => {
    dispatch(login(email, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
    function LoginForm({ onSubmit, loading, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
	navigate('/')
  };


  return (
    <motion.div initial={{ opacity: 0 }}
	animate={{ opacity: 1 }}
	exit={{ opacity: 0 }}>
      <NavBar />
      <div className="flex justify-center w-full mt-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center p-6 rounded-lg shadow-md lg:w-1/3"
        >
          <label className="font-medium mb-2 w-full">
            Email:
            <input
              className="form-input rounded-md mt-1 block w-full px-3 py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="font-medium mb-2 w-full">
            Password:
            <input
              className="form-input rounded-md mt-1 block w-full px-3 py-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="flex items-center justify-between">
            {loading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-center text-red-600">{error.message}</p>}
          </div>
          <button className="mt-4 py-2 px-4 rounded-md bg-indigo-500 text-white hover:bg-indigo-600">
            Log in
          </button>
		  <span className="w-full mt-2"> Vous n'avez pas encore de compte ? <a href="/register" className="underline text-blue-600">S'inscrire </a></span>
        </form>
      </div>
    </motion.div>
  );
})


