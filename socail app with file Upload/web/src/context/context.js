import React, { createContext, useReducer } from 'react'
import { reducer } from './reducer.js';
export const GlobalContext = createContext("Initial Value");
let data = {
  user: {},
  isLogin : false ,
  role : null,
  darkTheme: true
}
export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}