// To track the basket
import React, { createContext, useContext, useReducer } from "react";

const storage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [];

export const initialState = {
  basket: storage,
  state: 'free'
};
// this is the data layer
export const StateContext = createContext();

// Build a provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
