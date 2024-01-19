import { useEffect } from 'react';
import { useIdeasContext } from '../hooks/useIdeasContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import IdeaDetails from "../components/IdeaDetails"
import IdeaForm from '../components/IdeaForm';


const Home = () => {
  const {ideas, dispatch} = useIdeasContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch(`/api/ideas`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      }) // TODO change to backend server prod url
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_IDEAS', payload: json})
      }
    }
    if (user) {
      fetchIdeas()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className='ideas'>
        {ideas && ideas.map((idea) => (
          <IdeaDetails key={idea._id} idea={idea} />
        ))}
      </div>
      <IdeaForm />
    </div>
  );

}
export default Home