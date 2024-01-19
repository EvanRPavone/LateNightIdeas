import { createContext, useReducer } from "react";

export const IdeasContext = createContext()

export const ideasReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IDEAS':
      return {
        ideas: action.payload
      }
    case 'CREATE_IDEA':
      return {
        ideas: [action.payload, ...state.ideas]
      }
    case 'DELETE_IDEA':
      return {
        ideas: state.ideas.filter((i) => i._id !== action.payload._id)
      }
    default:
      return state
  }
};

export const IdeasContextProvider = ({ children }) => {
  // children is App.js | in index.js
  const [state, dispatch] = useReducer(ideasReducer, {
    ideas: null
  });

  return (
    <IdeasContext.Provider value={{...state, dispatch}}>
      { children }
    </IdeasContext.Provider>
  )
}