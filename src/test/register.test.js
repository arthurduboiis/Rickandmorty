import React from "react";
import { render, screen, fireEvent } from "@testing-library/react/pure";
import RegisterForm from "../components/RegisterForm";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const mockStore = configureMockStore();
const store = mockStore({});

describe("RegisterForm", () => {
  it("no submit register form when data is not valid", () => {
    const onSubmit = jest.fn();
    render(
		<Router>
<Provider store={store}>
		<RegisterForm />
	</Provider>
		</Router>
	
	);

    const username = "testUsername";
    const email = "testEmail@test.com";
    const password = "test";
    const submitButton = screen.getByText("Register");

	fireEvent.change(screen.getByLabelText("username"), { target: { value: username } });
	fireEvent.change(screen.getByLabelText("emailuser"), { target: { value: email } });
	fireEvent.change(screen.getByLabelText("password"), { target: { value: password } });
	fireEvent.click(submitButton);

	expect(onSubmit).not.toHaveBeenCalled();
  });
});

