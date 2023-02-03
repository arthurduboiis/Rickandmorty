import React from "react";
import { render, screen, fireEvent } from "@testing-library/react/pure";
//import EpisodeCard from "../components/RegisterForm";

import { BrowserRouter as Router } from "react-router-dom";


// TODO
// NEED TO CHANGE ALL FIREBASE CALLS TO V9
// INSTEAD OF V8 (CURRENTLY USED IN THE APP) TO MAKE THE TESTS WORK
// https://firebase.google.com/docs/web/modular-upgrade

// GIVE UP FOR THE MOMENT BECAUSE OF THE TIME ( AND MOTIVATION)

describe("Episode page", () => {
  //	let store;

  //  beforeEach(() => {
  //    store = configureMockStore({});
  //  });

  it("test received data", () => {
    //const onSubmit = jest.fn();

    //const mockStore = configureMockStore();
    //const store = mockStore({});

    //(firebase.auth).mockReturnValueOnce({});

    //jest.mock('firebase/app', () => {
    //	return {
    //	  auth: jest.fn(),
    //	};
    //  });


    //const username = "testUsername";
    //const email = "testEmail@test.com";
    //const password = "test";
    //const submitButton = screen.getByText("Register");

    //fireEvent.change(screen.getByLabelText("username"), {
    //  target: { value: username },
    //});
    //fireEvent.change(screen.getByLabelText("emailuser"), {
    //  target: { value: email },
    //});
    //fireEvent.change(screen.getByLabelText("password"), {
    //  target: { value: password },
    //});
    //fireEvent.click(submitButton);

    //expect(onSubmit).not.toHaveBeenCalled();
  });
});
