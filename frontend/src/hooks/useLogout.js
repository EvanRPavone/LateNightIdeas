import { useAuthContext } from "./useAuthContext";
import { useIdeasContext } from "./useIdeasContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: ideasDispatch } = useIdeasContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({type: 'LOGOUT'})
    ideasDispatch({type: 'SET_IDEAS', payload: null})
  }

  return {logout};
}