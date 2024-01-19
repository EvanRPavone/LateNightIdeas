import { useEffect, useState } from 'react';

// components
import IdeaDetails from "../components/IdeaDetails"
import IdeaForm from '../components/IdeaForm';


const Home = () => {
  const [ideas, setIdeas] = useState(null)

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch(`/api/ideas`) // TODO change to backend server prod url
      const json = await response.json()

      if (response.ok) {
        setIdeas(json)
      }
    }

    fetchIdeas()
  }, [])

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